export const toDateStartOrEnd = {

    methods: {

        toDateStart (value)
        {
            value = this.toDate(value, "yyyy-MM-dd");
            if (!value) {return "";}
            return value + " 00:00:00";
        },

        toDateEnd (value)
        {
            value = this.toDate(value, "yyyy-MM-dd");
            if (!value) {return "";}
            return value + " 23:59:59";
        },

        toDate (value, fmt)
        {
            if (!value) {return "";}
            fmt = typeof fmt !== "string" ? "yyyy-MM-dd HH:mm:ss" : fmt;
            var txts = value.toString().replace("/Date(", "").replace(")/", "");
            var times = Number(txts);
            times = isNaN(times) ? new Date(value).getTime() : times;
            var dt = new Date(Number(times.toString()));
            var o = {
                "M+": dt.getMonth() + 1,
                "d+": dt.getDate(),
                "H+": dt.getHours(),
                "m+": dt.getMinutes(),
                "s+": dt.getSeconds(),
                "q+": Math.floor((dt.getMonth() + 3) / 3),
                "S": dt.getMilliseconds()
            };
            if (/(y+)/.test(fmt))
            {
                fmt = fmt.replace(RegExp.$1, (dt.getFullYear() + "").substr(4 - RegExp.$1.length));
            }
            for (var k in o)
            {
                if (new RegExp("(" + k + ")").test(fmt))
                {
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[ k ]) : (("00" + o[ k ]).substr(("" + o[ k ]).length)));
                }
            }
            return fmt;
        }

    }
}