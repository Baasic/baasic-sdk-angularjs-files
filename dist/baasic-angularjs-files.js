(function (angular, undefined) { /* exported module */

    /** 
     * @description The angular.module is a global place for creating, registering or retrieving modules. All modules should be registered in an application using this mechanism. An angular module is a container for the different parts of your app - services, directives etc. In order to use `baasic.files` module functionality it must be added as a dependency to your app.
     * @copyright (c) 2015 Mono
     * @license MIT
     * @author Mono
     * @module baasic.files
     * @example
     (function (Main) {
     "use strict";
     var dependencies = [
     "baasic.api",
     "baasic.membership",
     "baasic.security",
     "baasic.userProfile",
     "baasic.files",
     "baasic.article",
     "baasic.dynamicResource",
     "baasic.keyValue",
     "baasic.valueSet"
     ];
     Main.module = angular.module("myApp.Main", dependencies);
     }
     (MyApp.Modules.Main = {})); 
     */
    var module = angular.module('baasic.files', ['baasic.api']);

    /* globals module */
    /**
     * @module baasicFilesRouteService
     * @description Baasic Files Route Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Files Route Service to obtain a needed routes while other routes will be obtained through HAL. By convention, all route services use the same function names as their corresponding services.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicFilesRouteService', ['baasicUriTemplateService', function (uriTemplateService) {
            return {
                /**
                 * Parses find route which can be expanded with additional options. Supported items are: 
                 * - `searchQuery` - A string referencing files properties using the phrase or BQL (Baasic Query Language) search.
                 * - `page` - A value used to set the page number, i.e. to retrieve certain files subset from the storage.
                 * - `rpp` - A value used to limit the size of result set per page.
                 * - `sort` - A string used to set the files property to sort the result collection by.
                 * - `embed` - Comma separated list of resources to be contained within the current representation.
                 * @method        
                 * @example baasicFilesRouteService.find.expand({searchQuery: '<search-phrase>'});               
                 **/
                find: uriTemplateService.parse('files/{?searchQuery,page,rpp,sort,embed,fields}'),

                /**
                 * Parses get route; this route doesn't expose any properties.
                 * @method        
                 * @example baasicFilesRouteService.get.expand({});               
                 **/
                get: uriTemplateService.parse('files/{id}/{?embed,fields}'),

                streams: {
                    /**
                     * Parses get route; this route should be expanded with the id or path of the desired file stream.
                     * @method streams.get
                     * @example baasicFilesRouteService.streams.get.expand({id: '<path>'});               
                     **/
                    get: uriTemplateService.parse('file-streams/{id}/'),

                    /**
                     * Parses create route; this route should be expanded with the path which indicates where the stream will be saved.
                     * @method streams.create
                     * @example baasicFilesRouteService.streams.create.expand({path: '<path>'});               
                     **/
                    create: uriTemplateService.parse('file-streams/{path}/'),

                    /**
                     * Parses create route; this route should be expanded with the id or path of the previously saved resource.
                     * @method streams.update    
                     * @example baasicFilesRouteService.streams.update.expand({id: '<path>'});               
                     **/
                    update: uriTemplateService.parse('file-streams/{id}/')

                },

                batch: {
                    /**
                     * Parses remove route; this must be expanded with a list of file identifiers which need to be removed.
                     * @method batch.remove       
                     * @example baasicFilesRouteService.batch.remove.expand({ids: <ids>);              
                     **/
                    remove: uriTemplateService.parse('file-streams/batch/{ids}'),
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
     - [URI Template](https://github.com/Baasic/uritemplate-js) syntax enables expanding the Baasic route templates to Baasic REST URIs providing it with an object that contains URI parameters.
     - All end-point objects are transformed by the associated route service.
     */

    /* globals module */
    /**
     * @module baasicFilesService
     * @description Baasic Files Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Files Route Service to obtain a needed routes while other routes will be obtained through HAL. By convention, all route services use the same function names as their corresponding services.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicFilesService', ['baasicApiHttp', 'baasicApiService', 'baasicConstants', 'baasicFilesRouteService', function (baasicApiHttp, baasicApiService, baasicConstants, filesRouteService) {
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
                    get: function (data) {
                        if (!angular.isObject(data)) {
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
                    update: function (data, stream) {
                        if (!angular.isObject(data)) {
                            data = {
                                id: data
                            };
                        }
                        var formData = new FormData();
                        formData.append('file', stream);
                        return baasicApiHttp({
                            transformRequest: angular.identity,
                            url: filesRouteService.streams.update.expand(data),
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
                    create: function (data, stream) {
                        if (!angular.isObject(data)) {
                            data = {
                                path: data
                            };
                        }
                        var formData = new FormData();
                        formData.append('file', stream);
                        return baasicApiHttp({
                            transformRequest: angular.identity,
                            url: filesRouteService.streams.create.expand(data),
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
                    remove: function (ids) {
                        var data = ids.join(',');
                        return baasicApiHttp.delete(filesRouteService.batch.remove.expand({
                            ids: data
                        }));
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

    /* globals module */
    /**
     * @module baasicMediaVaultRouteService
     * @description Baasic Media Vault Route Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Media Vault Route Service to obtain a needed routes while other routes will be obtained through HAL. By convention, all route services use the same function names as their corresponding services.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicMediaVaultRouteService', ['baasicUriTemplateService', function (uriTemplateService) {
            return {
                /**
                 * Parses find route which can be expanded with additional options. Supported items are: 
                 * - `searchQuery` - A string referencing media vault properties using the phrase or BQL (Baasic Query Language) search.
                 * - `page` - A value used to set the page number, i.e. to retrieve certain media vault subset from the storage.
                 * - `rpp` - A value used to limit the size of result set per page.
                 * - `sort` - A string used to set the media vault property to sort the result collection by.
                 * - `embed` - Comma separated list of resources to be contained within the current representation.
                 * @method        
                 * @example baasicMediaVaultRouteService.find.expand({searchQuery: '<search-phrase>'});               
                 **/
                find: uriTemplateService.parse('media-vaults/{?searchQuery,page,rpp,sort,embed,fields}'),

                /**
                 * Parses get route; this route doesn't expose any properties.
                 * @method        
                 * @example baasicMediaVaultRouteService.get.expand({});               
                 **/
                get: uriTemplateService.parse('media-vaults/{id}/{?embed,fields}'),

                streams: {
                    /**
                     * Parses get route; this route should be expanded with the id or path of the desired file stream.
                     * @method streams.get
                     * @example baasicMediaVaultRouteService.streams.get.expand({id: '<path>'});               
                     **/
                    get: uriTemplateService.parse('media-vault-streams/{id}/'),

                    /**
                     * Parses create route; this route should be expanded with the path which indicates where the stream will be saved.
                     * @method streams.create
                     * @example baasicMediaVaultRouteService.streams.create.expand({path: '<path>'});               
                     **/
                    create: uriTemplateService.parse('media-vault-streams/{path}/'),

                    /**
                     * Parses create route; this route should be expanded with the id or path of the previously saved resource.
                     * @method streams.update
                     * @example baasicMediaVaultRouteService.streams.update.expand({id: '<path>'});               
                     **/
                    update: uriTemplateService.parse('media-vault-streams/{id}/')
                },

                batch: {
                    /**
                     * Parses remove route; this must be expanded with a list of media vault identifiers which need to be removed.
                     * @method batch.remove       
                     * @example baasicMediaVaultRouteService.batch.remove.expand({entryIds: <entryIds>);              
                     **/
                    remove: uriTemplateService.parse('media-vault-streams/batch/{entryIds}'),
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
     - [URI Template](https://github.com/Baasic/uritemplate-js) syntax enables expanding the Baasic route templates to Baasic REST URIs providing it with an object that contains URI parameters.
     - All end-point objects are transformed by the associated route service.
     */

    /* globals module */
    /**
     * @module baasicMediaVaultService
     * @description Baasic Media Vault Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Media Vault Route Service to obtain a needed routes while other routes will be obtained through HAL. By convention, all route services use the same function names as their corresponding services.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicMediaVaultService', ['baasicApiHttp', 'baasicApiService', 'baasicConstants', 'baasicMediaVaultRouteService', function (baasicApiHttp, baasicApiService, baasicConstants, mediaVaultRouteService) {
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
                 * Returns a promise that is resolved once the remove action has been performed. This action will remove a media vault resource from the system if successfully completed. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicMediaVaultRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.removeParams(mediaVaultEntry);
                 var uri = params['model'].links('delete').href;
                 ```
                 * @method        
                 * @example 
                 // mediaVaultEntry is a resource previously fetched using get action.
                 baasicMediaVaultService.remove(mediaVaultEntry)
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
                     * Returns a promise that is resolved once the get action has been performed. Success response returns the file stream resource.
                     * @method streams.get        
                     * @example 
                     baasicMediaVaultService.stream.get('<path>')
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    get: function (data) {
                        if (!angular.isObject(data)) {
                            data = {
                                id: data
                            };
                        }
                        baasicApiHttp.get(mediaVaultRouteService.streams.get.expand(data));
                    },

                    /**
                     * Returns a promise that is resolved once the update file stream action has been performed; this action will replace the existing stream with a new one.
                     * @method streams.update
                     * @example 
                     baasicMediaVaultService.streams.update('<path>', <file-stream>)
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    update: function (data, stream) {
                        if (!angular.isObject(data)) {
                            data = {
                                id: data
                            };
                        }
                        var formData = new FormData();
                        formData.append('file', stream);
                        return baasicApiHttp({
                            transformRequest: angular.identity,
                            url: mediaVaultRouteService.streams.update.expand(data),
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
                    create: function (data, stream) {
                        if (!angular.isObject(data)) {
                            data = {
                                path: data
                            };
                        }
                        var formData = new FormData();
                        formData.append('file', stream);
                        return baasicApiHttp({
                            transformRequest: angular.identity,
                            url: mediaVaultRouteService.streams.create.expand(data),
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
                     * Returns a promise that is resolved once the remove action has been performed. This action will remove media vault stream resources from the system if successfully completed. 
                     * @method batch.remove       
                     * @example 			 
                     baasicMediaVaultService.batch.remove(<mediaVaultIds>)
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });		
                     **/
                    remove: function (ids) {
                        var data = ids.join(',');
                        return baasicApiHttp.delete(mediaVaultRouteService.batch.remove.expand({
                            entryIds: data
                        }));
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

})(angular);