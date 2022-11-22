Thank you for buying my image carousal for OBS!

The native slideshow in OBS isn't very customizable and doesn't have all that much flair.
My image carousal has animations, captions and the added customizability that you would want with it!

- How to use in OBS
All you have to do is add the "carousal.html" file in OBS as a browser source.
You can either paste the file location in the URL or use "Local File" and select it.

- Configuration
To customize it the way you want it to look you'll have to edit the "userconfig.json".
After you have made your edits and saved it you have to go to the browser source settings and clear the cache for it at the bottom.


Image:
    position            | Pins the position of the image at the desired location | "top", "bottom", "left", "right"
    borderRadius*       | Rounds the corners of the image | Use a value of percentage or pixels i.e. "50%", "20px"
    transition          | Animation between each image | "image-fade", "image-slide", "image-flip"

    border
        visibility      | Adds a border around the image | "on" or "off"
        color*          | Border color | You can use the name of the desired color or a hexidecimal code i.e. "black", "red" or "#8113F2"
        width*          | Thickness of the border | Use a value of percentage or pixels i.e. "50%", "20px"

    glow
        visibility      | Adds a glow around the image. The colors of the glow are based on the image | "on" or "off"
        size            | How far the glow goes from the image | Use a value of pixels i.e. "20px"
        opacity*        | Transparency or how strong the glow is | Use a value of percentage i.e "50%"

caption
    text
        fontFamily      | Font of the caption | You can make use of local fonts or a font from the Google Font library. Just type in the name of the font.
        fontSize*       | Text size | Use a value of pixels i.e. "20px" or any css unit of your choosing.
        fontWeight*     | Weighting of the font | Dependant on the font, you use "normal", "700", "bold", etc.
        position        | Position of the caption | "top", "bottom"
        color*          | Text color | You can use the name of the color or a hexidecimal code i.e. "black", "red" or "#8113F2"
        opacity*        | Transparency of the text | Use a value of percentage i.e "50%"
        transition      | Animation of the caption | "text-fade", "text-slide"

    shadow
        visibility      | Adss a shadow behind the text | "on" or "off"
        color*          | Shadow color | You can use the name of the desired color or a hexidecimal code i.e. "black", "red" or "#8113F2"
        offset          | 
        size            | The fade of the shadow | A value of "100%" makes it blurry and a value of "0%" makes it sharp

duration                | How long an image stays before it transitions to the next one in seconds

*
You can use CSS values in these properties