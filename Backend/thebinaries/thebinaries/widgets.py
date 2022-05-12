from django.forms.widgets import Select

class ImageSelect(Select):
    template_name = 'image_select.html'
    option_template_name = 'image_select_option.html'

class IconSelect(Select):
    template_name = 'icon_select.html'
    option_template_name = 'icon_select_option.html'