var myCol = new Meteor.Collection('myCol');

if (Meteor.isClient) {
  Template.hello.events({
    'click input' : function () {
	Meteor.call('dlAndSave');
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });

  Meteor.methods({
    dlAndSave: function() {
	"use strict";
	var fileUrl = 'http://www.google.fr/images/srpr/logo4w.png',
	    filename = './.meteor/public/storage/myFile.png',
	    callback = function funcCallback(content) {
		saveGoogleLogo(filename, content);
	    };

	dlAndSaveGoogleLogo(fileUrl, callback);
    }
  });

  /**
   * Try to download a file
   */
  var dlAndSaveGoogleLogo = function funcDlAndSaveGoogleLogo(fileUrl, callback) {
	"use strict";
	request(fileUrl).pipe(Npm.require('fs').createWriteStream('./.meteor/public/storage/myFile.png'));
	

	/* This doesn't work because of encoding setted to utf8 by default in http package of meteor
	// more over i maybe didn't understood the fs stream process, have to look for it
	Meteor.http("GET", fileUrl, function funcStoreFile(error, result) {
	    "use strict";
	    if (!error) {
		console.log('dl is ok', stream);
		callback(stream);
	    } else {
		console.log('dl file FAIL', error, result);
	    }
	});*/
      },

      saveGoogleLogo = function funcSaveGoogleLog(filename, content) {
	"use strict";
        var fstream = Npm.require('fs');

        fstream.writeFile(filename, content, function funcStoreFileWriteFS(err) {
            if (!err) {
                console.log('writing file ok');
            } else {
                console.log('error during writing file', err);
            }
        });
      };
}
