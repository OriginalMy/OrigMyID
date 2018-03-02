$(document).ready(() => {
    var lngNS = ['main']

    var pageNS = $("body#bodyMainID").data('pagens');
    if(pageNS){
        lngNS.push(pageNS);
    }

    var lngConfig = {
        fallbackLng: 'PT',
        ns: lngNS,
        defaultNS: 'main',
        nsSeparator: ':',
        keySeparator: false,
        interpolation: {
            escapeValue: true,
            prefix: '__',
            suffix: '__',
            unescapePrefix: '-',
            nestingPrefix: '$t(',
            nestingSuffix: ')',
            defaultVariables: undefined
        },
        backend: {
            loadPath: '/locales/__ns__/__lng__.json',
            allowMultiLoading: false,
            crossDomain: false,
            parse: JSON.parse
        },
        detection: {
            order: ['querystring', 'cookie', 'navigator', 'localStorage'],
            lookupQuerystring: 'lng',
            lookupCookie: 'i18next',
            lookupLocalStorage: 'i18nextLng',
        },
        debug: false
    };

    function getNavLng() {
        var cookie = Cookies.get('i18n');

        if(Cookies.get('i18n')){
			lngConfig.lng = Cookies.get('i18n');
		} else {
            lngConfig.lng = 'PT';
            Cookies.set('i18n', lngConfig.lng);
        }
    }
    
    getNavLng();

    $('a.btn-lang').click(function () {
        var lang = $(this).data('lang');
        if(!lang){
            return;
        }

        lngConfig.lng = lang;
        Cookies.set('i18n', lngConfig.lng);

        initTranslate();
    });

    function initTranslate() {
        i18next
            .use(i18nextXHRBackend)
            .use(i18nextSprintfPostProcessor)
            .init(lngConfig, function (err, t) {
                jqueryI18next.init(i18next, $, {
                    tName: 't', // --> appends $.t = i18next.t
                    i18nName: 'i18n', // --> appends $.i18n = i18next
                    handleName: 'localize', // --> appends $(selector).localize(opts);
                    selectorAttr: 'data-i18n', // selector for translating elements
                    targetAttr: 'i18n-target', // data-() attribute to grab target element to translate (if diffrent then itself)
                    optionsAttr: 'i18n-options', // data-() attribute that contains options, will load/set if useOptionsAttr = true
                    useOptionsAttr: true, // see optionsAttr
                    parseDefaultValueFromContent: true // parses default values from content ele.val or ele.text
                });
                $('[data-i18n]').localize();
            });
    }

    initTranslate();

});