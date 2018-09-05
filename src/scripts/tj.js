var casperjs = require('casper');
var casper = casperjs.create();
var x = casperjs.selectXPath;

casper.options.pageSettings = {
    javascriptEnabled: true,
    loadImages: false,
    loadPlugins: false,
};

var args = {
    tj_url: casper.cli.get('tj_url'),
    numero_processo: casper.cli.get('numero_processo')
};
// console.log('parameters data:', JSON.stringify(args));
const startUrl = args.tj_url;

console.log('Start with a web page: ' + startUrl);
casper.start(startUrl, function() {
    this.echo('Page title: ' + this.getTitle());
    this.then(function fillForm() {
        this.waitFor(function check() {
            return this.exists('[name="numeroDigitoAnoUnificado"]') && this.exists('[name="foroNumeroUnificado"]');
        }, function then() {
            this.echo('tela de pesquisa carregada com sucesso');

            this.fillSelectors('form#formConsulta', {
                '[name="numeroDigitoAnoUnificado"]': '0006656-58.2018',
                '[name="foroNumeroUnificado"]': '0481',
            }, true);

            this.waitForText('Dados do processo', function then() {
                this.echo(this.fetchText(x('(/html/body/div/table[4]/tbody/tr/td/div[1]/table[2]/tbody/tr[8]/td[2]/span)[1]')));
                this.echo(this.fetchText(x('(/html/body/div/table[4]/tbody/tr/td/div[1]/table[2]/tbody/tr[9]/td[2]/span)[1]')));
                this.capture('/home/diego/linte/node-casperjs-aws-lambda/resultado-pesquisa.jpg', undefined, {
                    format: 'jpg',
                    quality: 80,
                });
            }, function timeout() {
                console.log('timeout on wait search');
            }, 10000);

        }, function timeout() {
            console.log('timeout on wait fields');
        }, 10000);
    });
});

casper.run(function() {
    this.exit(); // close the casper instance.
});
