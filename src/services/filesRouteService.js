/* globals module */
/**
 * @module baasicFilesRouteService
 * @description Baasic Files Route Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Files Route Service to obtain a needed routes while other routes will be obtained through HAL. By convention, all route services use the same function names as their corresponding services.
*/
(function (angular, module, undefined) {
    'use strict';
    module.service('baasicFilesRouteService', ['baasicUriTemplateService',
        function (uriTemplateService) {
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
                    get: uriTemplateService.parse('file-streams/{id}'),

                    /**
                    * Parses create route; this route should be expanded with the path which indicates where the stream will be saved.
                    * @method streams.create
                    * @example baasicFilesRouteService.streams.create.expand({path: '<path>'});               
                    **/ 			
                    create: uriTemplateService.parse('file-streams/{path}'),
                    
                    /**
                    * Parses create route; this route should be expanded with the id or path of the previously saved resource.
                    * @method streams.update    
                    * @example baasicFilesRouteService.streams.update.expand({id: '<path>'});               
                    **/ 			
                    update: uriTemplateService.parse('file-streams/{id}')               
                    
                },

                batch: {
                    /**
                    * Parses remove route; this URI template does not expose any additional options.
                    * @method batch.remove       
                    * @example baasicFilesRouteService.batch.remove.expand({});              
                    **/                      
                    remove: uriTemplateService.parse('files/batch'), 
                    
                    /**
                    * Parses update route; this URI template does not expose any additional options.
                    * @method batch.update       
                    * @example baasicFilesRouteService.batch.update.expand({});              
                    **/                      
                    update: uriTemplateService.parse('files/batch')                                      
                },
                
                acl: {
					/**
					* Parses get acl route; this URI template should be expanded with the Id of the file entry resource.					
					* @method acl.get       
					* @example 
baasicFilesRouteService.acl.get.expand(
	{id: '<file-entry-id>'}
);
					**/ 				
                    get: uriTemplateService.parse('files/{id}/acl/{?fields}'),
                    
					/**
					* Parses update acl route; this URI template should be expanded with the Id of the file entry resource.					
					* @method acl.update       
					* @example 
baasicFilesRouteService.acl.update.expand(
	{id: '<file-entry-id>'}
);
					**/ 					
                    update: uriTemplateService.parse('files/{id}/acl/{?fields}'),
                    
					/**
					* Parses deleteByUser acl route which can be expanded with additional options. Supported items are:
					* - `id` - Id of the file entry resource.
					* - `accessAction` - Action abbreviation which identifies ACL policy assigned to the specified user and file entry resource.
					* - `user` - A value which uniquely identifies user for which ACL policy needs to be removed.					
					* @method acl.deleteByUser       
					* @example 
baasicFilesRouteService.acl.deleteByUser.expand({
    id: '<file-entry-id>', 
    accessAction: '<access-action>', 
    user: '<username>'
});
					**/ 					
                    deleteByUser: uriTemplateService.parse('files/{id}/acl/actions/{accessAction}/users/{user}/'),
                    
					/**
					* Parses deleteByUser acl route which can be expanded with additional options. Supported items are:
					* - `id` - Id of the file entry resource.
					* - `accessAction` - Action abbreviation which identifies ACL policy assigned to the specified role and file entry resource.
					* - `role` - A value which uniquely identifies role for which ACL policy needs to be removed.					
					* @method acl.deleteByRole       
					* @example 
baasicFilesRouteService.acl.deleteByRole.expand({
    id: '<file-entry-id>', 
    accessAction: '<access-action>', 
    role: '<role-name>'
});
					**/ 					
                    deleteByRole: uriTemplateService.parse('files/{id}/acl/actions/{accessAction}/roles/{role}/')					
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
