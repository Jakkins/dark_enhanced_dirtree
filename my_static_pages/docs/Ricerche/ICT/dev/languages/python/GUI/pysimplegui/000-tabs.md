# Tabs

```python
import sys

sys.path.append(
    "C:\\Users\\{username}\\AppData\\Roaming\\Python\\Python311\\site-packages"
)

import PySimpleGUI as sg

column1 = [[sg.Text(f"Scrollable{i}")] for i in range(10)]

tabgrp = [
    [
        sg.TabGroup(
            [
                [
                    sg.Tab(
                        "Personal Details",
                        column1,
                    ),
                ]
            ],
            tab_location="centertop",
            title_color="Red",
            tab_background_color="Purple",
            selected_title_color="Green",
            selected_background_color="Gray",
            border_width=5,
        ),
        sg.Button("Close"),
    ]
]

sg.Window(title="Hello World", layout=[[tabgrp]], margins=(200, 50)).read()
```
