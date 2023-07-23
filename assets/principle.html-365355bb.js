const e=JSON.parse('{"key":"v-857335ec","path":"/posts/cross-platform/Flutter/principle.html","title":"Flutter 工作原理","lang":"zh-CN","frontmatter":{"icon":"engine","date":"2023-04-26T00:00:00.000Z","cover":"https://w.wallhaven.cc/full/4v/wallhaven-4vp2x3.png","category":["Flutter"],"tag":["Flutter"],"description":"Flutter 工作原理 本文档解释了使 Flutter API 正常工作的 Flutter 工具包内部工作原理。由于 Flutter widget 是以积极组合的形式构建的，所以使用 Flutter 构建的用户界面含有大量 widget。为了支撑这些负载，Flutter 使用了次线性算法来布局和构建 widget，这些数据结构使树形结构优化更加高效，并且具有很多常量因子优化。通过一些额外的机制，该设计也允许开发者利用回调（用于构建用户可见的 widget）来轻松创建无限滚动列表。 积极可组合性 组合性是 Flutter 最为出众的一个特性。widget 通过组合其他 widget 的方式进行构建，并且这些 widget 自身由更基础的 widget 构建。比如，Padding 是一个 widget 而非其他 widget 的属性。因此，使用 Flutter 创建的用户界面是由多个 widget 组成的。","head":[["meta",{"property":"og:url","content":"https://oragekk.me/Zzh/posts/cross-platform/Flutter/principle.html"}],["meta",{"property":"og:site_name","content":"ZiHao Blog"}],["meta",{"property":"og:title","content":"Flutter 工作原理"}],["meta",{"property":"og:description","content":"Flutter 工作原理 本文档解释了使 Flutter API 正常工作的 Flutter 工具包内部工作原理。由于 Flutter widget 是以积极组合的形式构建的，所以使用 Flutter 构建的用户界面含有大量 widget。为了支撑这些负载，Flutter 使用了次线性算法来布局和构建 widget，这些数据结构使树形结构优化更加高效，并且具有很多常量因子优化。通过一些额外的机制，该设计也允许开发者利用回调（用于构建用户可见的 widget）来轻松创建无限滚动列表。 积极可组合性 组合性是 Flutter 最为出众的一个特性。widget 通过组合其他 widget 的方式进行构建，并且这些 widget 自身由更基础的 widget 构建。比如，Padding 是一个 widget 而非其他 widget 的属性。因此，使用 Flutter 创建的用户界面是由多个 widget 组成的。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://w.wallhaven.cc/full/4v/wallhaven-4vp2x3.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-07-22T12:59:51.000Z"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:alt","content":"Flutter 工作原理"}],["meta",{"property":"article:author","content":"ZiHao"}],["meta",{"property":"article:tag","content":"Flutter"}],["meta",{"property":"article:published_time","content":"2023-04-26T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-07-22T12:59:51.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Flutter 工作原理\\",\\"image\\":[\\"https://w.wallhaven.cc/full/4v/wallhaven-4vp2x3.png\\"],\\"datePublished\\":\\"2023-04-26T00:00:00.000Z\\",\\"dateModified\\":\\"2023-07-22T12:59:51.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"ZiHao\\",\\"url\\":\\"https://orgaekk.me\\"}]}"]]},"headers":[{"level":2,"title":"积极可组合性","slug":"积极可组合性","link":"#积极可组合性","children":[{"level":3,"title":"次线性布局","slug":"次线性布局","link":"#次线性布局","children":[]},{"level":3,"title":"次线性 widget 构建","slug":"次线性-widget-构建","link":"#次线性-widget-构建","children":[]},{"level":3,"title":"线性协调","slug":"线性协调","link":"#线性协调","children":[]},{"level":3,"title":"树结构优化","slug":"树结构优化","link":"#树结构优化","children":[]},{"level":3,"title":"恒定因子优化","slug":"恒定因子优化","link":"#恒定因子优化","children":[]},{"level":3,"title":"元素和 RenderObject 树的分离","slug":"元素和-renderobject-树的分离","link":"#元素和-renderobject-树的分离","children":[]}]},{"level":2,"title":"无限滚动","slug":"无限滚动","link":"#无限滚动","children":[{"level":3,"title":"视窗感知布局","slug":"视窗感知布局","link":"#视窗感知布局","children":[]},{"level":3,"title":"按需构建 widget","slug":"按需构建-widget","link":"#按需构建-widget","children":[]}]},{"level":2,"title":"人机工程 API","slug":"人机工程-api","link":"#人机工程-api","children":[{"level":3,"title":"与开发者思维模式相匹配的专项 API","slug":"与开发者思维模式相匹配的专项-api","link":"#与开发者思维模式相匹配的专项-api","children":[]},{"level":3,"title":"明确的参数","slug":"明确的参数","link":"#明确的参数","children":[]},{"level":3,"title":"参数陷阱","slug":"参数陷阱","link":"#参数陷阱","children":[]},{"level":3,"title":"积极报告错误","slug":"积极报告错误","link":"#积极报告错误","children":[]},{"level":3,"title":"响应式","slug":"响应式","link":"#响应式","children":[]},{"level":3,"title":"插值","slug":"插值","link":"#插值","children":[]}]},{"level":2,"title":"结论","slug":"结论","link":"#结论","children":[]}],"git":{"createdTime":1690030791000,"updatedTime":1690030791000,"contributors":[{"name":"Zzhgitup","email":"99540215+Zzhgitup@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":28.77,"words":8630},"filePathRelative":"posts/cross-platform/Flutter/principle.md","localizedDate":"2023年4月26日","excerpt":"<h1> Flutter 工作原理</h1>\\n<p>本文档解释了使 Flutter API 正常工作的 Flutter 工具包内部工作原理。由于 Flutter widget 是以积极组合的形式构建的，所以使用 Flutter 构建的用户界面含有大量 widget。为了支撑这些负载，Flutter 使用了次线性算法来布局和构建 widget，这些数据结构使树形结构优化更加高效，并且具有很多常量因子优化。通过一些额外的机制，该设计也允许开发者利用回调（用于构建用户可见的 widget）来轻松创建无限滚动列表。</p>\\n<h2> 积极可组合性</h2>\\n<p>组合性是 Flutter 最为出众的一个特性。widget 通过组合其他 widget 的方式进行构建，并且这些 widget 自身由更基础的 widget 构建。比如，<code>Padding</code> 是一个 widget 而非其他 widget 的属性。因此，使用 Flutter 创建的用户界面是由多个 widget 组成的。</p>","copyright":{"author":"ZiHao","license":"CC BY-NC-SA 4.0"},"autoDesc":true}');export{e as data};