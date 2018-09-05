var runner = require('./src/runner');

// App entry Point
exports.handler = function (event, context) {
    console.log('Running index.handler', new Date());
    console.log('==================================================');
    console.log('event', event);
    console.log('==================================================');

    let filename = ''; // file should be placed inside /src/scripts/
    let args = {}; // attach & pass this data to sample-script.js
    const type = 'TJ'; // FORCED
    if (type === 'TJ') {
        //set filename script
        filename = 'tj'; // FORCED
        // set args
        args.tj_url = 'https://esaj.tjsp.jus.br/cpopg/open.do';
        args.numero_processo = '0006656-58.2018.8.26.0481';
    }

    filename = `${filename}.js`; // file extension
    console.log('Executing file named: ', filename, 'with parameters:', JSON.stringify(args));
    console.log('==================================================');
    // Execute the casperJS script and exit.
    runner(filename, args, function(err, data) {
        console.log('==================================================');
        console.log('Stopping index.handler', new Date());
        context.done();
        console.log('==================================================');
    });
};
