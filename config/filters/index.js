const { DateTime, Settings } = require("luxon");
Settings.defaultLocale = "fr";

module.exports = {
    dateToFormat: function (date, format) {
        return DateTime.fromJSDate(date, { zone: 'utc' }).toFormat(
            String(format)
        )
    },

    dateToISO: function (date) {
        return DateTime.fromJSDate(date, { zone: 'utc' }).toISO({
            includeOffset: false,
            suppressMilliseconds: true
        })
    },

    dateFromISO: function (timestamp) {
        return DateTime.fromISO(timestamp, { zone: 'utc' }).toJSDate()
    },

    dateFromUnixTimespamp: function (timestamp) {
        return DateTime.fromMillis(timestamp, { zone: 'utc' }).toJSDate()
    },

    debugger: function (...args) {
        console.log(...args)
        debugger;
    }
}
