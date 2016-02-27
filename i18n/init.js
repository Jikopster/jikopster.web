var locales = ['en', 'ru']
var param = 'lang'

var i18n = require('i18n')
i18n.configure({
  queryParameter: param,
  cookie: param,
  locales: locales,
  directory: __dirname
})

module.exports = function middleware(req, res, next) {
  res.locals.locales = locales
  res.locals.locales.param = param
  i18n.init(req, res, function() {
    res.cookie(param, req.locale, { maxAge: 60*60*24*365*1000, httpOnly: true })
    next()
  })
}