module.exports = function (grunt) {
    const config = require('./screeps.json');

    const branch = grunt.option('branch') || config.branch;
    const email = grunt.option('email') || config.email;
    const username = grunt.option('username') || config.username;
    const password = grunt.option('password') || config.password;
    const ptr = grunt.option('ptr') ? true : config.ptr;
    const private_directory = grunt.option('private_directory') || config.private_directory;

    grunt.loadNpmTasks('grunt-screeps');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-rsync');


    grunt.initConfig({
            screeps: {
                options: {
                    email: email,
                    password: password,
                    branch: 'default',
                    ptr: false
                },
                dist: {
                    files: [
                        {
                            src: ['*.js'],
                        }
                    ]
                }
            },
            // Remove all files from the dist folder.
            clean: {
                'dist': ['dist']
            },
            // Copy all source files into the dist folder, flattening the folder structure by converting path delimiters to underscores
            copy: {
                // Pushes the game code to the dist folder so it can be modified before being send to the screeps server.
                screeps: {
                    files: [{
                        expand: true,
                        cwd: 'src/',
                        src: '**',
                        dest: 'dist',
                        flatten: true,
                        filter: 'isFile',
                    }],
                    options: {
                        process: function (dest, src) {
                            // Change the path name utilize underscores for folders
                            return dest.replace(/require\('ai\//g, "require(\'");
                        }

                    }
                }
            },
            // Copy files to the folder the client uses to sink to the private server.
            // Use rsync so the client only uploads the changed files.
            rsync: {
                options: {
                    args: ["--verbose", "--checksum"],
                    exclude:
                        [".git*"],
                    recursive:
                        true
                }
                ,
                private: {
                    options: {
                        src: './dist/',
                        dest: private_directory,
                    }
                }
                ,
            }
            ,
        }
    )
    ;
    grunt.registerTask('default', ['clean', 'copy:screeps', 'screeps']);
    grunt.registerTask('private', ['clean', 'copy:screeps', 'rsync:private']);

}
;