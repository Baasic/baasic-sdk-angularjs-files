/* globals module */
/**
 * @module baasicMediaVaultService
 * @description Baasic Media Vault Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Media Vault Route Service to obtain needed routes while other routes will be obtained through HAL. By convention, all route services use the same function names as their corresponding services.
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
                * Returns a promise that is resolved once the get action has been performed. Success response returns requested media vault resource.
                * @method        
                * @example 
baasicMediaVaultService.get('<media-vault-id>')
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
                 * Returns a promise that is resolved once the remove action has been performed. This action will remove one or many media vault resources from the system if successfully completed. If derived resource's format is passed, such as `width` and `height` for the image type of media vault resource, the operation will remove just derived resource. Otherwise, specified media vault and all its accompanying derived resources will be removed from the system. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply baasicMediaVaultRouteService route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.removeParams(mediaVaultEntry);
var uri = params['model'].links('delete').href;
```
                 * @method        
                 * @example 
// mediaVaultEntry is a media vault resource previously fetched using get action. The following action will remove the original media vault resource and all accompanying derived media vault resources.		
baasicMediaVaultService.remove(mediaVaultEntry)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
// mediaVaultEntry is a media vault resource previously fetched using get action. The following action will remove derived media vault resource only.		 
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
                    var params = baasicApiService.removeParams(data);
                    var href = mediaVaultRouteService.parse(params[baasicConstants.modelPropertyName].links('delete').href + '{?height,width}').expand(options);
                    return baasicApiHttp.delete(href);
                },
                
                /**
                 * Returns a promise that is resolved once the update media vault action has been performed; this action will update a media vault resource if successfully completed. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicMediaVaultRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.removeParams(mediaVaultEntry);
var uri = params['model'].links('put').href;
```
                 * @method        
                 * @example 
// mediaVaultEntry is a media vault resource previously fetched using get action.
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
                    * Returns a promise that is resolved once the get action has been performed. Success response returns the media vault stream if successfully completed. If derived resource's format is passed, such as `width` and `height` for the image type of media vault resource, the operation will return a stream of the derived resource. Otherwise, stream of the original media vault resource will be retrieved.
                    * @method streams.get        
                    * @example 
// Request the original media vault stream   
baasicMediaVaultService.stream.get('<path>')
.success(function (data) {
    // perform success action here
})
.error(function (response, status, headers, config) {
    // perform error handling here
});
// Request derived media vault stream    
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
                    * Returns a promise that is resolved once the get action has been performed. Success response returns the media vault stream as a blob. If derived resource's format is passed, such as `width` and `height` for the image type of media vault resource, the operation will return a blob of the derived media vault resource. Otherwise, blob of the original media vault resource will be retrieved. For more information on Blob objects please see [Blob Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Blob).
                    * @method streams.getBlob        
                    * @example 
// Request the original blob   
baasicMediaVaultService.stream.getBlob('<path>')
.success(function (data) {
    // perform success action here
})
.error(function (response, status, headers, config) {
    // perform error handling here
});
// Request derived blob   
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
                     * Returns a promise that is resolved once the update media vault stream action has been performed; this action will replace the existing stream with a new one. Alternatively, if a derived stream is being updated it will either create a new derived stream or replace the existing one. In order to update a derived stream, format needs to be passed (For example: `width` and `height` for the image type of media vault stream data type).
                     * @method streams.update
                     * @example
// Update existing original media vault stream
baasicMediaVaultService.streams.update('<path>', <media-vault-stream>)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
// Update derived media vault stream
baasicMediaVaultService.streams.update({id: '<path>', width: <width>, height: <height>}, <media-vault-stream>)
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
                     * Returns a promise that is resolved once the create media vault stream action has been performed; this action will upload the specified blob. For more information on Blob objects please see [Blob Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Blob).
                     * @method streams.create
                     * @example 
baasicMediaVaultService.streams.create('<path>', <blob>)
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
                  * Returns a promise that is resolved once the remove action has been performed. This action will remove media vault resources from the system if successfully completed. If derived resource's format is passed, such as `width` and `height` for the image type of media vault resource, the operation will remove just derived resource. Otherwise, specified media vault and all its accompanying derived resources will be removed from the system.
                  * @method batch.remove       
                  * @example
// Remove original media vault resources		 
baasicMediaVaultService.batch.remove([{ id: '<media-vault-id>' }])
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});	
// Remove derived media vault resources		 
baasicMediaVaultService.batch.remove([{ id: '<media-vault-id>', fileFormat: { width: <width>, height: <height> } }])
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});	  	
                  **/		                  
                  remove: function(data) {                                          
                    return baasicApiHttp({
                        url: mediaVaultRouteService.batch.remove.expand(data),
                        method: 'DELETE',
                        data: data
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
                      return baasicApiHttp.get(mediaVaultRouteService.processingProviderSettings.find.expand(baasicApiService.findParams(options)));
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
 * @overview 
 ***Notes:**
 - Refer to the [REST API documentation](https://github.com/Baasic/baasic-rest-api/wiki) for detailed information about available Baasic REST API end-points.
 - All end-point objects are transformed by the associated route service.
*/
