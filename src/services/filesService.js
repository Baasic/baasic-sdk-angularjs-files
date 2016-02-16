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
                 * Returns a promise that is resolved once the remove action has been performed. This action will remove a file resource from the system if successfully completed. Alternatively if options are specified the operation will remove all derived resource only. By performing delete on the original all derived resources will also be removed as well. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicFilesRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.removeParams(fileEntry);
var uri = params['model'].links('delete').href;
```
                 * @method        
                 * @example 
// fileEntry is a resource previously fetched using get action. The following action will remove the original resource and the derived resources.			 
baasicFilesRouteService.remove(fileEntry)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
// fileEntry is a resource previously fetched using get action. The following action will remove the derived resource only.		 
baasicFilesRouteService.remove(fileEntry, {width: <width>, height: <height>})
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});		
				**/		                			
                remove: function (data, options) {
                    var removeParams = baasicApiService.removeParams(options);
                    var params = baasicApiService.removeParams(data);
                    var href = filesRouteService.parse(params[baasicConstants.modelPropertyName].links('delete').href + '{?height,width}').expand(removeParams);
                    return baasicApiHttp.delete(href);
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
                    * Returns a promise that is resolved once the get action has been performed. Success response returns the file stream resource. In order to obtain a derived item width and height properties must be specified.
                    * @method streams.get        
                    * @example 
// Request the original resource               
baasicFilesService.stream.get({id: '<path>'})
.success(function (data) {
    // perform success action here
})
.error(function (response, status, headers, config) {
    // perform error handling here
});                    
// Request derived resource stream                
baasicFilesService.stream.get({id: '<path>', width: <width>, height: <height>})
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
                        return baasicApiHttp.get(filesRouteService.streams.get.expand(data));                                          
                    },
                    
                    /**
                    * Returns a promise that is resolved once the get action has been performed. Success response returns the file stream resource as a blob. In order to obtain a derived item width and height properties must be specified.
                    * @method streams.getBlob        
                    * @example 
// Request the original resource                 
baasicFilesService.stream.getBlob('<path>')
.success(function (data) {
    // perform success action here
})
.error(function (response, status, headers, config) {
    // perform error handling here
});
// Request derovated resource stream                 
baasicFilesService.stream.getBlob({id: '<path>', width: <width>, height: <height>})
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
                            url:  filesRouteService.streams.get.expand(data),
                            method: 'GET',
                            responseType: 'blob'                            
                        });                                                               
                    },                    

                     /**
                     * Returns a promise that is resolved once the update file stream action has been performed; this action will replace the existing stream with a new one. Alternatively if a derived item is being updated it will either create a new derived item or replace the existing derived item. In order to update a derived item width and height properties must be specified.
                     * @method streams.update
                     * @example
// Update existing original resource 
baasicFilesService.streams.update('<path>', <file-stream>)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
// Update derived resource 
baasicFilesService.streams.update({id: '<path>', width: <width>, height: <height>}, <file-stream>)
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
                  * Returns a promise that is resolved once the remove action has been performed. This action will remove file stream resources from the system if successfully completed. Alternatively if options are specified the operation will remove all specified derived resources. By performing delete on the original all derived resources will also be removed as well.
                  * @method batch.remove       
                  * @example
// Remove original resources                
baasicFilesService.batch.remove(<fileStreamIds>)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});		
// Remove derived resources                
baasicFilesService.batch.remove(<fileStreamIds>, {width: <width>, height: <height>})
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});		  
                  **/		                  
                  remove: function(ids, options) {
                    var params = baasicApiService.removeParams(options);
                    return baasicApiHttp({
                        url: filesRouteService.batch.remove.expand(params),
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
                },
                
                acl: {
                    /**
                    * Returns a promise that is resolved once the get action has been performed. Success response returns a list of ACL policies established for the specified file entry resource.
                    * @method acl.get       
                    * @example 
baasicFilesService.acl.get({id: '<file-entry-id>'})
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                    **/ 					
                    get: function (options) {
                        var params = angular.copy(options);
                        return baasicApiHttp.get(filesRouteService.acl.get.expand(params));
                    },
                    /**
                    * Returns a promise that is resolved once the update acl action has been performed, this action creates new ACL policy for the specified user profile resource.
                    * @method acl.update      
                    * @example 
var options = {id : '<file-entry-id>'};
var aclObj =  {
 actionId: '<action-id'>,
 roleId: '<roleId>',
 userId: '<userId>'
};
options[baasicConstants.modelPropertyName] = aclObj;
baasicFilesService.acl.update(options)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
				    **/							
                    update: function (options) {
                        var params = angular.copy(options);
                        return baasicApiHttp.put(filesRouteService.acl.get.expand(params), params[baasicConstants.modelPropertyName]);
                    },
                    /**
                    * Returns a promise that is resolved once the removeByUser action has been performed. This action deletes ACL policy assigned to the specified user and user profile resource.
                    * @method acl.deleteByUser      
                    * @example 
baasicFilesService.acl.removeByUser('<file-entry-id>', '<access-action>', '<username>')
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
				    **/						
                    removeByUser: function (fileEntryId, action, user, data) {
                        var params = baasicApiService.removeParams(data);
                        params.fileEntryId = fileEntryId;
                        params.user = user;
                        params.accessAction = action;
                        return baasicApiHttp.delete(filesRouteService.acl.deleteByUser.expand(params));
                    },
                    /**
                    * Returns a promise that is resolved once the removeByRole action has been performed. This action deletes ACL policy assigned to the specified role and user profile resource.
                    * @method acl.deleteByRole      
                    * @example 
baasicFilesService.acl.removeByRole('<file-entry-id>', '<access-action>', '<role-name>')
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
				    **/						
                    removeByRole: function (fileEntryId, action, role, data) {
                        var params = baasicApiService.removeParams(data);
                        params.fileEntryId = fileEntryId;
                        params.role = role;
                        params.accessAction = action;
                        return baasicApiHttp.delete(filesRouteService.acl.deleteByRole.expand(params));
                    }
                },                 
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
