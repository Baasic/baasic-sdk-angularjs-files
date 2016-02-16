/* globals module */
/**
 * @module baasicMediaVaultService
 * @description Baasic Media Vault Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Media Vault Route Service to obtain a needed routes while other routes will be obtained through HAL. By convention, all route services use the same function names as their corresponding services.
*/
(function (angular, module, undefined) {
    'use strict';
    module.service('baasicMediaVaultService', ['baasicApiHttp', 'baasicApiService', 'baasicConstants', 'baasicMediaVaultRouteService',
        function (baasicApiHttp, baasicApiService, baasicConstants, mediaVaultRouteService) {
            return {                     
                 /**
                 * Returns a promise that is resolved once the find action has been performed. Success response returns a list of media vault resources matching the given criteria.
                 * @method        
                 * @example 
baasicMediaVaultService.find({
  pageNumber : 1,
  pageSize : 10,
  orderBy : '<field>',
  orderDirection : '<asc|desc>',
  search : '<search-phrase>'
})
.success(function (collection) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});    
                **/ 				
                find: function (options) {
                    return baasicApiHttp.get(mediaVaultRouteService.find.expand(baasicApiService.findParams(options)));
                },    
                
                /**
                * Returns a promise that is resolved once the get action has been performed. Success response returns the media vault resource.
                * @method        
                * @example 
baasicMediaVaultService.get('<id>')
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                **/  				
                get: function (id, options) {
                    return baasicApiHttp.get(mediaVaultRouteService.get.expand(baasicApiService.getParams(id, options)));
                },
                
                 /**
                 * Returns a promise that is resolved once the remove action has been performed. This action will remove a media vault resource from the system if successfully completed. Alternatively if options are specified the operation will remove all derived resource only. By performing delete on the original all derived resources will also be removed as well. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicMediaVaultRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.removeParams(mediaVaultEntry);
var uri = params['model'].links('delete').href;
```
                 * @method        
                 * @example 
// mediaVaultEntry is a resource previously fetched using get action. The following action will remove the original resource and the derived resources.			 
baasicMediaVaultService.remove(mediaVaultEntry)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
// mediaVaultEntry is a resource previously fetched using get action. The following action will remove the derived resource only.		 
baasicMediaVaultService.remove(mediaVaultEntry, {width: <width>, height: <height>})
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});		
				**/		                			
                remove: function (data, options) {
                    if (!options){
                        options = {};
                    }                    
                    var removeParams = baasicApiService.removeParams(options);
                    var params = baasicApiService.removeParams(data);
                    var href = mediaVaultRouteService.parse(params[baasicConstants.modelPropertyName].links('delete').href + '{?height,width}').expand(removeParams);
                    return baasicApiHttp.delete(href);
                },
                
                /**
                 * Returns a promise that is resolved once the update media vault action has been performed; this action updates a media vault resource. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicMediaVaultRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.removeParams(mediaVaultEntry);
var uri = params['model'].links('put').href;
```
                 * @method        
                 * @example 
// mediaVaultEntry is a resource previously fetched using get action.
mediaVaultEntry.description = '<description>';
baasicMediaVaultService.update(mediaVaultEntry)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
				**/		                			
                update: function (data) {
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('put').href, params[baasicConstants.modelPropertyName]);
                },
                                                                                            
                streams: {
                    /**
                    * Returns a promise that is resolved once the get action has been performed. Success response returns the file stream resource. In order to obtain a derived item width and height properties must be specified.
                    * @method streams.get        
                    * @example 
// Request the original resource
baasicMediaVaultService.stream.get('<path>')
.success(function (data) {
    // perform success action here
})
.error(function (response, status, headers, config) {
    // perform error handling here
});
// Request derived resource stream
baasicMediaVaultService.stream.get({id: '<path>', width: <width>, height: <height>})
.success(function (data) {
    // perform success action here
})
.error(function (response, status, headers, config) {
    // perform error handling here
});
                    **/  	                    
                    get: function(data) {
                        if (!angular.isObject(data)){
                            data = {
                              id: data  
                            };
                        }                        
                        return baasicApiHttp.get(mediaVaultRouteService.streams.get.expand(data));                                          
                    },
                    
                    /**
                    * Returns a promise that is resolved once the get action has been performed. Success response returns the file stream resource as a blob. In order to obtain a derived item width and height properties must be specified.
                    * @method streams.getBlob        
                    * @example 
// Request original resource
baasicMediaVaultService.stream.getBlob('<path>')
.success(function (data) {
    // perform success action here
})
.error(function (response, status, headers, config) {
    // perform error handling here
});
// Request derived resource stream
baasicMediaVaultService.stream.getBlob({id: '<path>', width: <width>, height: <height>})
.success(function (data) {
    // perform success action here
})
.error(function (response, status, headers, config) {
    // perform error handling here
});
                    **/  	                    
                    getBlob: function(data) {
                        if (!angular.isObject(data)){
                            data = {
                              id: data  
                            };
                        }                        
                        return baasicApiHttp({
                            url:  mediaVaultRouteService.streams.get.expand(data),
                            method: 'GET',
                            responseType: 'blob'                            
                        });                                                               
                    },                      

                     /**
                     * Returns a promise that is resolved once the update file stream action has been performed; this action will replace the existing stream with a new one. Alternatively if a derived item is being updated it will either create a new derived item or replace the existing derived item. In order to update a derived item width and height properties must be specified.
                     * @method streams.update
                     * @example
// Update existing original resource
baasicMediaVaultService.streams.update('<path>', <file-stream>)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
// Update derived resource
baasicMediaVaultService.streams.update({id: '<path>', width: <width>, height: <height>}, <file-stream>)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                    **/ 	                    
                    update: function(data, stream) {
                        if (!angular.isObject(data)){
                            data = {
                              id: data  
                            };
                        }
                        var formData = new FormData();
                        formData.append('file', stream);
                        return baasicApiHttp({
                            transformRequest: angular.identity,
                            url:  mediaVaultRouteService.streams.update.expand(data),
                            method: 'POST',
                            data: formData,
                            headers: {
                                'Content-Type': undefined
                            }
                        });                       
                    },

                     /**
                     * Returns a promise that is resolved once the create file stream action has been performed; this action will upload the specified file stream.
                     * @method streams.create
                     * @example 
baasicMediaVaultService.streams.update('<path>', <file-stream>)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                    **/ 	                                         
                    create: function(data, stream) {
                        if (!angular.isObject(data)){
                            data = {
                              path: data  
                            };
                        }
                        var formData = new FormData();
                        formData.append('file', stream);
                        return baasicApiHttp({
                            transformRequest: angular.identity,
                            url:  mediaVaultRouteService.streams.create.expand(data),
                            method: 'POST',
                            data: formData,
                            headers: {
                                'Content-Type': undefined
                            }
                        });                        
                    }                    
                },
                
                batch: {
                  /**
                  * Returns a promise that is resolved once the remove action has been performed. This action will remove media vault stream resources from the system if successfully completed.  Alternatively if options are specified the operation will remove all specified derived resources. By performing delete on the original all derived resources will also be removed as well.
                  * @method batch.remove       
                  * @example
// Remove original resources		 
baasicMediaVaultService.batch.remove(<mediaVaultIds>)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});	
// Remove derived resources		 
baasicMediaVaultService.batch.remove(<mediaVaultIds>, {width: <width>, height: <height>})
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});	  	
                  **/		                  
                  remove: function(ids, options) {
                    if (!options){
                        options = {};
                    }                      
                    var params = baasicApiService.removeParams(options);
                    return baasicApiHttp({
                        url: mediaVaultRouteService.batch.remove.expand(params),
                        method: 'DELETE',
                        data: ids
                    });                         
                  },
                  /**
                  * Returns a promise that is resolved once the update action has been performed; this action updates specified media vault resources.
                  * @method batch.update       
                  * @example 
baasicMediaVaultService.batch.update(files)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                  **/ 				
                  update: function (data) {
                      return baasicApiHttp.put(mediaVaultRouteService.batch.update.expand(), baasicApiService.updateParams(data)[baasicConstants.modelPropertyName]);
                  }                                  
                },
                
                settings: {
                    /**
                    * Returns a promise that is resolved once the get action has been performed. Success response returns media vault settings resource.
                    * @method settings.get        
                    * @example 
baasicMediaVaultService.settings.get()
.success(function (data) {
    // perform success action here
})
.error(function (response, status, headers, config) {
    // perform error handling here
});
                    **/  	                    
                    get: function() {                   
                        return baasicApiHttp.get(mediaVaultRouteService.settings.get.expand({}));                                          
                    },  
                    
                  /**
                  * Returns a promise that is resolved once the update action has been performed; this action updates the media vault settings resource.
                  * @method settings.update       
                  * @example 
baasicMediaVaultService.settings.update(mediaVaultSettings)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                  **/ 				
                  update: function (data) {
                      return baasicApiHttp.put(mediaVaultRouteService.settings.update.expand(), baasicApiService.updateParams(data)[baasicConstants.modelPropertyName]);
                  }                                        
                },
                
               processingProviderSettings: {
                   /**
                   * Returns a promise that is resolved once the find action has been performed. Success response returns a list of media vault processing providers matching the given criteria.
                   * @method        
                   * @example 
baasicMediaVaultService.processingProviderSettings.find({
  pageNumber : 1,
  pageSize : 10,
  orderBy : '<field>',
  orderDirection : '<asc|desc>',
  search : '<search-phrase>'
})
.success(function (collection) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});    
                  **/ 				
                  find: function (options) {
                      return baasicApiHttp.get(mediaVaultRouteService.processingProviderSettingsfind.expand(baasicApiService.findParams(options)));
                  },    
                
                  /**
                  * Returns a promise that is resolved once the get action has been performed. Success response returns the media vault processing provider resource.
                  * @method        
                  * @example 
baasicMediaVaultService.processingProviderSettings.get('<id>')
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                  **/  				
                  get: function (id, options) {
                      return baasicApiHttp.get(mediaVaultRouteService.processingProviderSettings.get.expand(baasicApiService.getParams(id, options)));
                  },
                                
                  /**
                  * Returns a promise that is resolved once the update action has been performed; this action updates a media vault processing provider setting resource. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicMediaVaultRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.removeParams(processingProviderSetting);
var uri = params['model'].links('put').href;
```
                  * @method        
                  * @example 
// processingProviderSettings is a resource previously fetched using get action.
processingProviderSettings.settings.faceDetection = true;
baasicMediaVaultService.processingProviderSettings.update(processingProviderSetting)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
				  **/		                			
                  update: function (data) {
                      var params = baasicApiService.updateParams(data);
                      return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('put').href, params[baasicConstants.modelPropertyName]);
                  }                   
               }            
            };       
        }]);
}(angular, module));

/**
 * @copyright (c) 2015 Mono
 * @license MIT
 * @author Mono
 * @overview 
 ***Notes:**
 - Refer to the [REST API documentation](https://github.com/Baasic/baasic-rest-api/wiki) for detailed information about available Baasic REST API end-points.
 - All end-point objects are transformed by the associated route service.
*/
