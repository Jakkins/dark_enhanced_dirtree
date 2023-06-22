# Dark mode theme

## Simple

```kt
import javafx.scene.paint.Color
import javafx.stage.Screen
import tornadofx.*

class AppView : App(MainView::class)

class MyStylesheet: Stylesheet() {
    init {
        root {
            baseColor = Color.BLACK
            accentColor = Color.WHITE
        }
    }
}

class MainView : View() {
    init {
        reloadStylesheetsOnFocus()
        importStylesheet(MyStylesheet::class)
    }
    override val root = tabpane {
        tab("Tab 1") {
            vbox {
                label("This is the content of Tab 1")
            }
        }
        tab("Tab 2") {
            vbox {
                label("This is the content of Tab 2")
            }
        }
        tab("Tab 3") {
            vbox {
                label("This is the content of Tab 3")
            }
        }
    }
}
```
