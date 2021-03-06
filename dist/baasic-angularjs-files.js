/*
 Baasic AngularJS Files v1.0.0
 (c) 2014-2017 Mono Ltd. http://baasic.com
 License: MIT
*/
(function (angular, undefined) { /* exported module */

    /** 
     * @description The angular.module is a global place for creating, registering or retrieving modules. All modules should be registered in an application using this mechanism. An angular module is a container for the different parts of your app - services, directives etc. In order to use `baasic.files` module functionality it must be added as a dependency to your app.
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
     * @description Baasic Files Route Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Files Route Service to obtain needed routes while other routes will be obtained through HAL. By convention, all route services use the same function names as their corresponding services.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicFilesRouteService', ['baasicUriTemplateService', function (uriTemplateService) {
            return {
                /**
                 * Parses find route which can be expanded with additional options. Supported items are: 
                 * - `searchQuery` - A string referencing file properties using the phrase search.
                 * - `page` - A value used to set the page number, i.e. to retrieve certain file subset from the storage.
                 * - `rpp` - A value used to limit the size of result set per page.
                 * - `sort` - A string used to set the file property to sort the result collection by.
                 * - `embed` - Comma separated list of resources to be contained within the current representation.
                 * @method        
                 * @example 
                 baasicFilesRouteService.find.expand(
                 {searchQuery: '<search-phrase>'}
                 );
                 **/
                find: uriTemplateService.parse('files/{?searchQuery,page,rpp,sort,embed,fields}'),

                /**
                 * Parses get route; this route should be expanded with the Id of the file resource.
                 * @method        
                 * @example 
                 baasicFilesRouteService.get.expand(
                 {id: '<file-id>'}
                 );
                 **/
                get: uriTemplateService.parse('files/{id}/{?embed,fields}'),

                /**
                 * Parses link route; this URI template does not expose any additional options.
                 * @method        
                 * @example baasicFilesRouteService.link.expand({});              
                 **/
                link: uriTemplateService.parse('files/link'),

                streams: {
                    /**
                     * Parses get route; this route should be expanded with id or path of desired file stream. Additional supported items are:
                     * - `width` - width of desired derived image.
                     * - `height` - height of desired derived image.
                     * @method streams.get
                     * @example 
                     baasicFilesRouteService.streams.get.expand(
                     {id: '<path>'}
                     );
                     **/
                    get: uriTemplateService.parse('file-streams/{id}/{?width,height}'),

                    /**
                     * Parses create route; this route should be expanded with the path which indicates where the stream will be saved.
                     * @method streams.create
                     * @example 
                     baasicFilesRouteService.streams.create.expand(
                     {path: '<path>'}
                     );
                     **/
                    create: uriTemplateService.parse('file-streams/{path}'),

                    /**
                     * Parses update route; this route should be expanded with the id or path of the previously saved resource. Additional supported items are:
                     * - `width` - width of derived image to update.
                     * - `height` - height of derived image to update.                    
                     * @method streams.update    
                     * @example 
                     baasicFilesRouteService.streams.update.expand(
                     {id: '<path>'}
                     );
                     **/
                    update: uriTemplateService.parse('file-streams/{id}/{?width,height}')

                },

                batch: {
                    /**
                     * Parses unlink route; this URI template does not expose any additional options.                                    
                     * @method batch.unlink       
                     * @example baasicFilesRouteService.batch.unlink.expand({});              
                     **/
                    unlink: uriTemplateService.parse('files/batch/unlink'),

                    /**
                     * Parses update route; this URI template does not expose any additional options.
                     * @method batch.update       
                     * @example baasicFilesRouteService.batch.update.expand({});              
                     **/
                    update: uriTemplateService.parse('files/batch'),

                    /**
                     * Parses update route; this URI template does not expose any additional options.
                     * @method batch.link       
                     * @example baasicFilesRouteService.batch.link.expand({});              
                     **/
                    link: uriTemplateService.parse('files/batch/link')
                },

                acl: {
                    /**
                     * Parses get acl route; this URI template should be expanded with the Id of the file resource.					
                     * @method acl.get       
                     * @example 
                     baasicFilesRouteService.acl.get.expand(
                     {id: '<file-id>'}
                     );
                     **/
                    get: uriTemplateService.parse('files/{id}/acl/{?fields}'),

                    /**
                     * Parses update acl route; this URI template should be expanded with the Id of the file resource.					
                     * @method acl.update       
                     * @example 
                     baasicFilesRouteService.acl.update.expand(
                     {id: '<file-id>'}
                     );
                     **/
                    update: uriTemplateService.parse('files/{id}/acl/{?fields}'),

                    /**
                     * Parses deleteByUser acl route which can be expanded with additional options. Supported items are:
                     * - `id` - File id which uniquely identifies file resource whose security privileges need to be retrieved and updated.
                     * - `accessAction` - Action abbreviation which identifies ACL policy assigned to the specified user and file resource.
                     * - `user` - A value which uniquely identifies user for which ACL policy needs to be removed.					
                     * @method acl.deleteByUser       
                     * @example 
                     baasicFilesRouteService.acl.deleteByUser.expand({
                     id: '<file-id>', 
                     accessAction: '<access-action>', 
                     user: '<username>'
                     });
                     **/
                    deleteByUser: uriTemplateService.parse('files/{id}/acl/actions/{accessAction}/users/{user}/'),

                    /**
                     * Parses deleteByUser acl route which can be expanded with additional options. Supported items are:
                     * - `id` - File id which uniquely identifies file resource whose security privileges need to be retrieved and updated.
                     * - `accessAction` - Action abbreviation which identifies ACL policy assigned to the specified role and file resource.
                     * - `role` - A value which uniquely identifies role for which ACL policy needs to be removed.					
                     * @method acl.deleteByRole       
                     * @example 
                     baasicFilesRouteService.acl.deleteByRole.expand({
                     id: '<file-id>', 
                     accessAction: '<access-action>', 
                     role: '<role-name>'
                     });
                     **/
                    deleteByRole: uriTemplateService.parse('files/{id}/acl/actions/{accessAction}/roles/{role}/')
                },
                /**
                 * Parses and expands URI templates based on [RFC6570](http://tools.ietf.org/html/rfc6570) specifications. For more information please visit the project [GitHub](https://github.com/Baasic/uritemplate-js) page.
                 * @method
                 * @example 
                 baasicFilesRouteService.parse(
                 '<route>/{?embed,fields,options}'
                 ).expand(
                 {embed: '<embedded-resource>'}
                 );
                 **/
                parse: uriTemplateService.parse
            };
        }]);
    }(angular, module));
    /**
     * @overview 
     ***Notes:**
     - Refer to the [REST API documentation](http://dev.baasic.com/api/reference/home) for detailed information about available Baasic REST API end-points.
     - [URI Template](https://github.com/Baasic/uritemplate-js) syntax enables expanding the Baasic route templates to Baasic REST URIs providing it with an object that contains URI parameters.
     - All end-point objects are transformed by the associated route service.
     */

    /* globals module */
    /**
     * @module baasicFilesService
     * @description Baasic Files Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Files Route Service to obtain needed routes while other routes will be obtained through HAL. By convention, all route services use the same function names as their corresponding services.
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
                 * Returns a promise that is resolved once the get action has been performed. Success response returns requested file resource.
                 * @method        
                 * @example 
                 baasicFilesService.get('<file-id>')
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
                 * Returns a promise that is resolved once the unlink action has been performed. This action will remove one or many file resources from the system if successfully completed. If derived resource's format is passed, such as `width` and `height` for the image type of file resource, the operation will remove just derived resource. Otherwise, specified file and all its accompanying derived resources will be removed from the system. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply baasicFilesRouteService route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.removeParams(fileEntry);
                 var uri = params['model'].links('unlink').href;
                 ```
                 * @method        
                 * @example 
                 // fileEntry is a file resource previously fetched using get action. The following action will remove the original file resource and all accompanying derived file resources.
                 baasicFilesRouteService.remove(fileEntry)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 // fileEntry is a file resource previously fetched using get action. The following action will remove derived file resource only.
                 baasicFilesRouteService.remove(fileEntry, {width: <width>, height: <height>})
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                remove: function (data, options) {
                    return this.unlink(data, options);
                },

                /**
                 * Returns a promise that is resolved once the unlink action has been performed. This action will remove one or many file resources from the system if successfully completed. If derived resource's format is passed, such as `width` and `height` for the image type of file resource, the operation will remove just derived resource. Otherwise, specified file and all its accompanying derived resources will be removed from the system. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply baasicFilesRouteService route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.removeParams(fileEntry);
                 var uri = params['model'].links('unlink').href;
                 ```
                 * @method        
                 * @example 
                 // fileEntry is a file resource previously fetched using get action. The following action will remove the original file resource and all accompanying derived file resources.
                 baasicFilesRouteService.remove(fileEntry)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 // fileEntry is a file resource previously fetched using get action. The following action will remove derived file resource only.
                 baasicFilesRouteService.remove(fileEntry, {width: <width>, height: <height>})
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                unlink: function (data, options) {
                    if (!options) {
                        options = {};
                    }
                    var params = baasicApiService.removeParams(data);
                    var href = filesRouteService.parse(params[baasicConstants.modelPropertyName].links('unlink').href + '{?height,width}').expand(options);
                    return baasicApiHttp.delete(href);
                },

                /**
                 * Returns a promise that is resolved once the update file action has been performed; this action will update a file resource if successfully completed. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicFilesRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.updateParams(fileEntry);
                 var uri = params['model'].links('put').href;
                 ```
                 * @method        
                 * @example 
                 // fileEntry is a file resource previously fetched using get action.
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

                /**
                 * Returns a promise that is resolved once the link action has been performed; this action links file resource from other modules into the Files module (For example: file resources from the Media Vault module can be linked directly into the Files module).
                 * @method        
                 * @example 
                 baasicFilesService.link(fileObject)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                link: function (data) {
                    return baasicApiHttp.post(filesRouteService.link.expand(), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
                },

                streams: {
                    /**
                     * Returns a promise that is resolved once the get action has been performed. Success response returns the file stream if successfully completed. If derived resource's format is passed, such as `width` and `height` for the image type of file resource, the operation will return a stream of the derived resource. Otherwise, stream of the original file resource will be retrieved.
                     * @method streams.get        
                     * @example 
                     // Request the original file stream
                     baasicFilesService.stream.get({id: '<path>'})
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     // Request derived file stream
                     baasicFilesService.stream.get({id: '<path>', width: <width>, height: <height>})
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
                        return baasicApiHttp.get(filesRouteService.streams.get.expand(data));
                    },

                    /**
                     * Returns a promise that is resolved once the get action has been performed. Success response returns the file stream as a blob. If derived resource's format is passed, such as `width` and `height` for the image type of file resource, the operation will return a blob of the derived file resource. Otherwise, blob of the original file resource will be retrieved. For more information on Blob objects please see [Blob Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Blob).
                     * @method streams.getBlob        
                     * @example 
                     // Request the original blob
                     baasicFilesService.stream.getBlob('<path>')
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     // Request derived blob
                     baasicFilesService.stream.getBlob({id: '<path>', width: <width>, height: <height>})
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    getBlob: function (data) {
                        if (!angular.isObject(data)) {
                            data = {
                                id: data
                            };
                        }
                        return baasicApiHttp({
                            url: filesRouteService.streams.get.expand(data),
                            method: 'GET',
                            responseType: 'blob'
                        });
                    },

                    /**
                     * Returns a promise that is resolved once the update file stream action has been performed; this action will replace the existing stream with a new one. Alternatively, if a derived stream is being updated it will either create a new derived stream or replace the existing one. In order to update a derived stream, format needs to be passed (For example: `width` and `height` for the image type of file stream data type).
                     * @method streams.update
                     * @example
                     // Update original file stream
                     baasicFilesService.streams.update('<path>', <file-stream>)
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     // Update derived file stream
                     baasicFilesService.streams.update({id: '<path>', width: <width>, height: <height>}, <file-stream>)
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
                            method: 'PUT',
                            data: formData,
                            headers: {
                                'Content-Type': undefined
                            }
                        });
                    },

                    /**
                     * Returns a promise that is resolved once the create file stream action has been performed; this action will upload the specified blob. For more information on Blob objects please see [Blob Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Blob).
                     * @method streams.create
                     * @example 
                     baasicFilesService.streams.create('<path>', <blob>)
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
                     * Returns a promise that is resolved once the unlink action has been performed. This action will remove file resources from the system if successfully completed. If derived resource's format is passed, such as `width` and `height` for the image type of file resource, the operation will remove just derived resource. Otherwise, specified file and all its accompanying derived resources will be removed from the system.
                     * @method batch.remove       
                     * @example
                     // Remove original file resources
                     baasicFilesService.batch.remove([{ id: '<file-id>' }])
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     // Remove derived file resources
                     baasicFilesService.batch.remove([{ id: '<file-id>', fileFormat: { width: <width>, height: <height> } }])
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    remove: function (data) {
                        return this.unlink(data);
                    },

                    /**
                     * Returns a promise that is resolved once the unlink action has been performed. This action will remove file resources from the system if successfully completed. If derived resource's format is passed, such as `width` and `height` for the image type of file resource, the operation will remove just derived resource. Otherwise, specified file and all its accompanying derived resources will be removed from the system.
                     * @method batch.unlink       
                     * @example
                     // Remove original file resources
                     baasicFilesService.batch.unlink([{ id: '<file-id>' }])
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     // Remove derived file resources
                     baasicFilesService.batch.unlink([{ id: '<file-id>', fileFormat: { width: <width>, height: <height> } }])
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    unlink: function (data) {
                        return baasicApiHttp({
                            url: filesRouteService.batch.unlink.expand({}),
                            method: 'DELETE',
                            data: data
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
                    },

                    /**
                     * Returns a promise that is resolved once the link action has been performed; this action links file resources from other modules into the Files module (For example: file resources from the Media Vault module can be linked directly into the Files module).
                     * @method batch.link       
                     * @example 
                     baasicFilesService.batch.link(files)
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    link: function (data) {
                        return baasicApiHttp.post(filesRouteService.batch.link.expand(), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
                    }
                },

                acl: {
                    /**
                     * Returns a promise that is resolved once the get action has been performed. Success response returns a list of ACL policies established for the specified file resource.
                     * @method acl.get       
                     * @example 
                     baasicFilesService.acl.get({id: '<file-id>'})
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
                     * Returns a promise that is resolved once the update acl action has been performed, this action creates new ACL policy for the specified file resource.
                     * @method acl.update      
                     * @example 
                     var options = {id : '<file-id>'};
                     var aclObj =  {
                     actionId: '<action-id>',
                     roleId: '<role-id>',
                     userId: '<user-id>'
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
                     * Returns a promise that is resolved once the removeByUser action has been performed. This action deletes ACL policy assigned to the specified user and file resource.
                     * @method acl.deleteByUser      
                     * @example 
                     baasicFilesService.acl.removeByUser('<file-id>', '<access-action>', '<username>')
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    removeByUser: function (fileEntryId, action, user, data) {
                        var params = baasicApiService.removeParams(data);
                        params.id = fileEntryId;
                        params.user = user;
                        params.accessAction = action;
                        return baasicApiHttp.delete(filesRouteService.acl.deleteByUser.expand(params));
                    },
                    /**
                     * Returns a promise that is resolved once the removeByRole action has been performed. This action deletes ACL policy assigned to the specified role and file resource.
                     * @method acl.deleteByRole      
                     * @example 
                     baasicFilesService.acl.removeByRole('<file-id>', '<access-action>', '<role-name>')
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    removeByRole: function (fileEntryId, action, role, data) {
                        var params = baasicApiService.removeParams(data);
                        params.id = fileEntryId;
                        params.role = role;
                        params.accessAction = action;
                        return baasicApiHttp.delete(filesRouteService.acl.deleteByRole.expand(params));
                    }
                },
            };
        }]);
    }(angular, module));

    /**
     * @overview 
     ***Notes:**
     - Refer to the [REST API documentation](http://dev.baasic.com/api/reference/home) for detailed information about available Baasic REST API end-points.
     - All end-point objects are transformed by the associated route service.
     */

    /* globals module */
    /**
     * @module baasicMediaVaultRouteService
     * @description Baasic Media Vault Route Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Media Vault Route Service to obtain needed routes while other routes will be obtained through HAL. By convention, all route services use the same function names as their corresponding services.
     */
    (function (angular, module, undefined) {
        'use strict';
        module.service('baasicMediaVaultRouteService', ['baasicUriTemplateService', function (uriTemplateService) {
            return {
                /**
                 * Parses find route which can be expanded with additional options. Supported items are: 
                 * - `searchQuery` - A string referencing media vault properties using the phrase search.
                 * - `page` - A value used to set the page number, i.e. to retrieve certain media vault subset from the storage.
                 * - `rpp` - A value used to limit the size of result set per page.
                 * - `sort` - A string used to set the media vault property to sort the result collection by.
                 * - `embed` - Comma separated list of resources to be contained within the current representation.
                 * @method        
                 * @example 
                 baasicMediaVaultRouteService.find.expand(
                 {searchQuery: '<search-phrase>'}
                 );
                 **/
                find: uriTemplateService.parse('media-vaults/{?searchQuery,page,rpp,sort,embed,fields}'),

                /**
                 * Parses get route; this route should be expanded with the Id of media vault resource.
                 * @method        
                 * @example 
                 baasicMediaVaultRouteService.get.expand(
                 {id: '<media-vault-id>'}
                 );
                 **/
                get: uriTemplateService.parse('media-vaults/{id}/{?embed,fields}'),

                streams: {
                    /**
                     * Parses get route; this route should be expanded with id or path of desired media vault stream. Additional supported items are:
                     * - `width` - width of desired derived image.
                     * - `height` - height of desired derived image.                    
                     * @method streams.get
                     * @example 
                     baasicMediaVaultRouteService.streams.get.expand(
                     {id: '<path>'}
                     );
                     **/
                    get: uriTemplateService.parse('media-vault-streams/{id}/{?width,height}'),

                    /**
                     * Parses create route; this route should be expanded with the path which indicates where the stream will be saved.
                     * @method streams.create
                     * @example 
                     baasicMediaVaultRouteService.streams.create.expand(
                     {path: '<path>'}
                     );
                     **/
                    create: uriTemplateService.parse('media-vault-streams/{path}'),

                    /**
                     * Parses update route; this route should be expanded with the id or path of the previously saved media vault resource. Additional supported items are:
                     * - `width` - width of desired derived image.
                     * - `height` - height of desired derived image.                     
                     * @method streams.update
                     * @example 
                     baasicMediaVaultRouteService.streams.update.expand(
                     {id: '<path>'}
                     );
                     **/
                    update: uriTemplateService.parse('media-vault-streams/{id}/{?width,height}')
                },

                batch: {
                    /**
                     * Parses remove route; this URI template does not expose any additional options.                         
                     * @method batch.remove       
                     * @example baasicMediaVaultRouteService.batch.remove.expand({});              
                     **/
                    remove: uriTemplateService.parse('media-vaults/batch'),

                    /**
                     * Parses update route; this URI template does not expose any additional options.
                     * @method batch.update       
                     * @example baasicMediaVaultRouteService.batch.update.expand({});              
                     **/
                    update: uriTemplateService.parse('media-vaults/batch')
                },

                settings: {
                    /**
                     * Parses get route; this route doesn not expose any additional options.
                     * @method settings.get
                     * @example baasicMediaVaultRouteService.settings.get.expand({});               
                     **/
                    get: uriTemplateService.parse('media-vault-settings'),

                    /**
                     * Parses update route; this URI template does not expose any additional options.
                     * @method settings.update       
                     * @example baasicMediaVaultRouteService.settings.update.expand({});              
                     **/
                    update: uriTemplateService.parse('media-vault-settings')
                },
                processingProviderSettings: {
                    /**
                     * Parses find route which can be expanded with additional options. Supported items are: 
                     * - `searchQuery` - A string referencing media vault processing provider setting properties using the phrase search.
                     * - `page` - A value used to set the page number, i.e. to retrieve certain media vault processing provider setting subset from the storage.
                     * - `rpp` - A value used to limit the size of result set per page.
                     * - `sort` - A string used to set the media vault processing provider setting property to sort the result collection by.
                     * - `embed` - Comma separated list of resources to be contained within the current representation.
                     * @method        
                     * @example 
                     baasicMediaVaultRouteService.processingProviderSettings.find.expand(
                     {searchQuery: '<search-phrase>'}
                     );
                     **/
                    find: uriTemplateService.parse('media-vault-preprocessing-settings/{?searchQuery,page,rpp,sort,embed,fields}'),

                    /**
                     * Parses get route; this route should be expanded with Id of the media vault processing provider setting resource.
                     * @method        
                     * @example 
                     baasicMediaVaultRouteService.processingProviderSettings.get.expand(
                     {id: '<id>'}
                     );
                     **/
                    get: uriTemplateService.parse('media-vault-preprocessing-settings/{id}/{?embed,fields}')
                },
                /**
                 * Parses and expands URI templates based on [RFC6570](http://tools.ietf.org/html/rfc6570) specifications. For more information please visit the project [GitHub](https://github.com/Baasic/uritemplate-js) page.
                 * @method
                 * @example 
                 baasicFilesRouteService.parse(
                 '<route>/{?embed,fields,options}'
                 ).expand(
                 {embed: '<embedded-resource>'}
                 );
                 **/
                parse: uriTemplateService.parse
            };
        }]);
    }(angular, module));
    /**
     * @overview 
     ***Notes:**
     - Refer to the [REST API documentation](http://dev.baasic.com/api/reference/home) for detailed information about available Baasic REST API end-points.
     - [URI Template](https://github.com/Baasic/uritemplate-js) syntax enables expanding the Baasic route templates to Baasic REST URIs providing it with an object that contains URI parameters.
     - All end-point objects are transformed by the associated route service.
     */

    /* globals module */
    /**
     * @module baasicMediaVaultService
     * @description Baasic Media Vault Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Media Vault Route Service to obtain needed routes while other routes will be obtained through HAL. By convention, all route services use the same function names as their corresponding services.
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
                    if (!options) {
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
                    get: function (data) {
                        if (!angular.isObject(data)) {
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
                    getBlob: function (data) {
                        if (!angular.isObject(data)) {
                            data = {
                                id: data
                            };
                        }
                        return baasicApiHttp({
                            url: mediaVaultRouteService.streams.get.expand(data),
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
                            method: 'PUT',
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
                    remove: function (data) {
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
                    get: function () {
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
     - Refer to the [REST API documentation](http://dev.baasic.com/api/reference/home) for detailed information about available Baasic REST API end-points.
     - All end-point objects are transformed by the associated route service.
     */

})(angular);