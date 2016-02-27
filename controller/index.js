var VK = require('vk')

module.exports = function(req, res) {
  var locale = res.locals.locale
  var domain = 'jikopster'
  var vk = new VK(locale, domain)
  vk.get({}, function(result) {
    res.render('index', { news: result })
  })
}