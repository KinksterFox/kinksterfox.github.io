// ----------------------------
//    Custom Tag API Variables
// ----------------------------
const TAG_API = {
  base: "https://github.kinksterfox.com/api/custom-tags/",
  channel: "",
  tag: "",
  tagCache: ""
};

// ----------------------------
//    Custom Tag API Functions
// ----------------------------
async function getCustomTag(channelname, messenger) {
  TAG_API.tag = "";
  TAG_API.tagCache = "";
  
  TAG_API.channel = `${channelname}-tags.json`;
  const res = await fetch(`${TAG_API.base}${TAG_API.channel}`).then((response) => {
    return response.json();
  });
  
  TAG_API.tagCache = res.find(({ nick }) => nick === messenger);
  
  if (TAG_API.tagCache != undefined) {
    TAG_API.tag = TAG_API.tagCache.custom_tag;
  }
    
  if (!TAG_API.tag) {
    return null;
  }
  return TAG_API.tag
}
