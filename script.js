{{{appJS}}}

// This script is embedded in the footer of every page
!function() {
    var t = "https://webmention.io/api/mentions",
        a = $("hr.full");
    if (1 === a.length) {
        var e = $.ajax(t, {
                data: {
                    target: "some site" + location.pathname
                }
            }),
            n = function(t) {
                if (!t.author || !t.author.url)
                    return "";
                var a = new Date(t.published),
                    e = '<div class="comment-author vcard"><img class="avatar photo u-photo" src="' + t.author.photo + '" alt="' + t.author.name + '">';
                return e += '<cite class="fn"><a class="url" rel="external nofollow" href="' + t.author.url + '">' + t.author.name + "</a></cite>", e += '<div class="comment-meta commentmetadata"><a href="' + t.url + '"><time pubdate datetime="' + t.published + '">' + a + "</time></a></div>"
            };
        e.then(function(t) {
            var e = t.links || [];
            "function" == typeof [].map && (e = e.map(function(t) {
                return t.date = +new Date(t.verified_date), t
            }).sort(function(t, a) {
                return t.date > a.date ? 1 : -1
            }));
            var o = [],
                i = [];
            e.length && ($.each(e, function(t, a) {
                var e = a.data,
                    l = "";
                "reply" === a.activity.type ? (l += '<li class="comment u-comment h-cite">', l += n(e), l += '<div class="comment-content">' + e.content + "</div>", l += "</li>", o.push(l)) : (l = '<li class="h-cite">', l += a.activity.sentence_html, l += "</li>", i.push(l))
            }), a.after('<h3>Webmentions</h3><ol class="mentions-list">' + i.join("") + "</ol>"), a.after('<h3>Comments</h3><ol class="commentlist">' + o.join("") + "</ol>"))
        }), e["catch"](function(t, a) {
            console.log(t), console.log(a)
        })
    }
}();
