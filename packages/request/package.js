console.log('/packages/request/package.js');

Package.describe({
	summary: 'Application that spy website for home', 
        environments: ['server']
});

Npm.depends({request: '2.21.0'});

Package.on_use(function (api) {
	api.add_files('./request.js', 'server');
});
