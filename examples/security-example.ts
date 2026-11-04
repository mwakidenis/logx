// Security example
import { secureCompare, secureRandomInt, escapeHtml } from "@mwakidenis/logx";

console.log(secureCompare("secret", "secret")); // true
console.log(secureCompare("secret", "different")); // false

console.log(secureRandomInt(1, 100)); // random int between 1 and 100

console.log(escapeHtml("<script>alert('xss')</script>"));
// &lt;script&gt;alert(&#39;xss&#39;)&lt;/script&gt;
