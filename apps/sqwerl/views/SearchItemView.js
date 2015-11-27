/*globals SC, Sqwerl*/

Sqwerl.SearchItemView = SC.TemplateCollectionView.create({

    firstFoundInPropertyBinding: 'Sqwerl.SearchItemController.firstFoundInProperty',

    hasFoundInPropertiesBinding: 'Sqwerl.SearchItemController.hasFoundInProperties',

    hasMoreThanOneFoundInPropertyBinding: 'Sqwerl.SearchItemController.hasMoreThanOneFoundInProperty',

    relativeUrlBinding: 'Sqwerl.SearchItemController.relativeUrl',

    itemViewTemplateName: 'search_item'
});