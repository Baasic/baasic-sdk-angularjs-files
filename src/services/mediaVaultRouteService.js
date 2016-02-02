/* globals module */
/**
 * @module baasicMediaVaultRouteService
 * @description Baasic Media Vault Route Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Media Vault Route Service to obtain a needed routes while other routes will be obtained through HAL. By convention, all route services use the same function names as their corresponding services.
*/
(function (angular, module, undefined) {
    'use strict';
    module.service('baasicMediaVaultRouteService', ['baasicUriTemplateService',
        function (uriTemplateService) {
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
