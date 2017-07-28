;(function ($) {
  var speaker

  var apikey = 'developerdemokeydeveloperdemokey'
  var voice = 'euritalianfemale'
  var filename = 'audiofile'
  var langs

  $.get('https://api.ispeech.org/api/rest?apikey=developerdemokeydeveloperdemokey&action=information&output=json', data => {
    langs = []
    console.log(data)
    for (var k in data) {
      if (k.indexOf('voice-locale-') >= 0) {
        var parts = k.split('-')
        var partsiso = data[k].split('-')
        var voc = data['voice-' + parts[2]]
        langs.push({id: parts[2], ed: parts[3], iso: partsiso[0], iso2: partsiso[1], voice: voc})
      }
    }
    console.log(langs)
  })

  function set (text, lang, clb) {
    setLang(lang)

    var url = `https://api.ispeech.org/api/rest?apikey=${apikey}&action=convert&text=${text}&voice=${voice}&format=mp3&frequency=44100&bitrate=256&speed=1&startpadding=1&endpadding=1&pitch=110&filename=${filename}`

    speaker = new Audio(url)

    $(speaker).on('loadeddata', function () {
      console.log('loaded')
      if (clb) clb()
    })
  }

  function play () {
    speaker.play()
  }

  function setLang (iso) {
    langs.forEach(function (d) {
      if (d.iso === iso) voice = d.voice
    })
    console.log('voice', voice)
  }

  window.TTS = {}
  window.TTS.set = set
  window.TTS.setLang = setLang
  window.TTS.play = play
  window.TTS.languages = langs
})(window.jQuery)
