Thank you for buying my image carousal for OBS!

The native slideshow in OBS isn't very customizable and doesn't have all that much flair.
My image carousal has animations, captions and the added customizability that you would want with it!

This is always a work in progress and if you have any feedback or requests feel free to contact me!
I'll do what I can that is possible within my knowledge and might learn new things!
Find me anywhere on https://kinksterfox.com

/- How to use in OBS -/
All you have to do is add the "carousal.html" file in OBS as a browser source.
You can either paste the file location in the URL or use "Local File" and select it.

/- Recommendation for configuring the carousal -/
For "images.json" and "userconfig.json" I would recommend editing them with "Notepad++".
It's a free text/source code editor that provides more than what default Notepad offers.
It makes text files a lot more readable by color coding text, showing tab indentations and sections.

https://notepad-plus-plus.org/downloads/

/- Adding images -/
Place your images in the "images" folder. They have to be of the filetype ".jpeg", ".png", ".gif" or ".svg"
You add and remove images in the carousal by editing the "images.json" file.
For each image you need to add this below the next one inside the squared brackets under "images".

        {
            "caption": "Example text - Jolt",
            "file": "image.png"
        },

for "file" you use the exact filename that you gave the image.
Captions are optional so if you don't want one for an image just leave it empty.
For the last image leave out the ",".

/- Configuration -/
To customize the way you want it to look, edit "userconfig.json".
After you have made your edits and saved it you have to go to the browser source settings and clear the cache for it at the bottom in OBS.

    Property            | Description                                   | Possible values

Image:
    position            | Position of the image inside the source       | "top", "bottom", "left", "right"
    borderRadius*       | Rounds the corners of the image               | Use a value of percentage or pixels i.e. "50%", "20px"
    transition          | Animation between each image                  | "image-fade", "image-slide", "image-flip"

    border
        visibility      | Adds a border around the image                | "on" or "off"
        color*          | Border color                                  | You can use the name of the color or a hexidecimal code i.e. "purple", "darkred" or "#8113F2"
        width*          | Thickness of the border                       | Use a value of pixels i.e. "20px"

    glow
        visibility      | Adds a glow around the image.                 | "on" or "off"
        size            | How far the glow goes from the image          | Use a value of pixels i.e. "20px"
        opacity*        | Transparency or how strong the glow is        | Use a value of percentage i.e "50%"

caption:
    text
        fontFamily      | Font of the caption                           | Local font or a font from the Google Font library. Just type in the name of the font.
        fontSize*       | Text size                                     | Use a value of pixels i.e. "20px" or any css unit of your choosing.
        fontWeight*     | Weighting of the font                         | Dependant on the font, you use "normal", "700", "bold", etc.
        position        | Position of the caption                       | "top", "bottom"
        color*          | Text color                                    | You can use the name of the color or a hexidecimal code i.e. "purple", "darkred" or "#8113F2"
        opacity*        | Transparency of the text                      | Use a value of percentage i.e "50%"
        transition      | Animation of the caption                      | "text-fade", "text-slide"

    shadow
        visibility      | Adss a shadow behind the text                 | "on" or "off"
        color*          | Shadow color                                  | You can use the name of the color or a hexidecimal code i.e. "purple", "darkred" or "#8113F2"
        offset          | Diagonal distance between the shadow and text | Use a value of pixels i.e. "20px"
        size            | The fade of the shadow                        | A value of "100%" makes it blurry and a value of "0%" makes it sharp

duration                | How long an image stays before it transitions to the next one in seconds

*You can use CSS values in these properties