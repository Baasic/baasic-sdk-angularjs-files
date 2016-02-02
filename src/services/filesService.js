/* globals module */
/**
 * @module baasicFilesService
 * @description Baasic Files Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Files Route Service to obtain a needed routes while other routes will be obtained through HAL. By convention, all route services use the same function names as their corresponding services.
*/
(function (angular, module, undefined) {
    'use strict';
    module.service('baasicFilesService', ['baasicApiHttp', 'baasicApiService', 'baasicConstants', 'baasicFilesRouteService',
        function (baasicApiHttp, baasicApiService, baasicConstants, filesRouteService) {
            return {                                                                                                                    
                 /**
                 * Returns a promise that is resolved once the find action has been performed. Success response returns a list of file resources matching the given criteria.
                 * @method        
                 * @example 
baasicFilesService.find({
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
                    return baasicApiHttp.get(filesRouteService.find.expand(baasicApiService.findParams(options)));
                },    
                
                /**
                * Returns a promise that is resolved once the get action has been performed. Success response returns the file resource.
                * @method        
                * @example 
baasicFilesService.get('<id>')
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                **/  				
                get: function (id, options) {
                    return baasicApiHttp.get(filesRouteService.get.expand(baasicApiService.getParams(id, options)));
                },
                
                 /**
                 * Returns a promise that is resolved once the remove action has been performed. This action will remove a file resource from the system if successfully completed. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicFilesRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.removeParams(fileEntry);
var uri = params['model'].links('delete').href;
```
                 * @method        
                 * @example 
// fileEntry is a resource previously fetched using get action.				 
baasicFilesRouteService.remove(fileEntry)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});		
				**/		                			
                remove: function (data) {
                    var params = baasicApiService.removeParams(data);
                    return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete').href);
                },
                
                /**
                 * Returns a promise that is resolved once the update file action has been performed; this action updates a file resource. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicFilesRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.removeParams(fileEntry);
var uri = params['model'].links('put').href;
```
                 * @method        
                 * @example 
// fileEntry is a resource previously fetched using get action.
fileEntry.description = '<description>';
baasicFilesService.update(fileEntry)
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
                    * Returns a promise that is resolved once the get action has been performed. Success response returns the file stream resource.
                    * @method streams.get        
                    * @example 
baasicFilesService.stream.get('<path>')
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
                        baasicApiHttp.get(filesRouteService.streams.get.expand(data));                                          
                    },

                     /**
                     * Returns a promise that is resolved once the update file stream action has been performed; this action will replace the existing stream with a new one.
                     * @method streams.update
                     * @example 
baasicFilesService.streams.update('<path>', <file-stream>)
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
                            url:  filesRouteService.streams.update.expand(data),
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
baasicFilesService.streams.update('<path>', <file-stream>)
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
                            url:  filesRouteService.streams.create.expand(data),
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
                  * Returns a promise that is resolved once the remove action has been performed. This action will remove file stream resources from the system if successfully completed. 
                  * @method batch.remove       
                  * @example 			 
  baasicFilesService.batch.remove(<fileStreamIds>)
  .success(function (data) {
    // perform success action here
  })
  .error(function (response, status, headers, config) {
    // perform error handling here
  });		
                  **/		                  
                  remove: function(ids) {
                    return baasicApiHttp({
                        url: filesRouteService.batch.remove.expand(),
                        method: 'DELETE',
                        data: ids
                    }); 
                  },
                  /**
                  * Returns a promise that is resolved once the update action has been performed; this action updates specified file resources.
                  * @method batch.update       
                  * @example 
  baasicFilesService.batch.update(files)
  .success(function (data) {
    // perform success action here
  })
  .error(function (response, status, headers, config) {
    // perform error handling here
  });
                  **/ 				
                  update: function (data) {
                      return baasicApiHttp.put(filesRouteService.batch.update.expand(), baasicApiService.updateParams(data)[baasicConstants.modelPropertyName]);
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
