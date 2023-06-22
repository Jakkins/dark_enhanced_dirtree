# Full project until now

## Main.kt

```kotlin
import tornadofx.launch
import view.AppView

fun main(args: Array<String>) {
    launch<AppView>(args)
}
```

## AppController.kt

```kotlin
package controller

import controller.module.AppData

class AppController(private val controllerAppView: ControllerAppView) {
    init {
        controllerAppView.updateAll(0, arrayListOf(AppData("ciao"), AppData("magio"), AppData("biscotti")))
    }
}
```

## AppData.kt

```kotlin
package controller.module

class AppData(val info: String)
```

## ControllerAppView.kt

```kotlin
package controller

import controller.module.AppData

interface ControllerAppView {
    fun updateAll(tab: Int, data: List<AppData>)
}
```

## AppStyle.kt

```kotlin
package view.stylesheets

import javafx.scene.paint.Color
import tornadofx.Stylesheet

class AppStyle: Stylesheet() {
    init {
        root {
            baseColor = Color.BLACK
            accentColor = Color.WHITE
        }
    }
}
```

## AppView.kt

```kotlin
package view

import controller.AppController
import controller.ControllerAppView
import controller.module.AppData
import javafx.scene.control.Label
import javafx.scene.layout.VBox
import javafx.stage.Screen
import javafx.stage.Stage
import tornadofx.*
import view.stylesheets.AppStyle

class AppView: App(MainView::class), ControllerAppView {
    override fun start(stage: Stage) {
        super.start(stage)
        AppController(this)
    }
    override fun updateAll(tab: Int, data: List<AppData>) {
        val mainView = find<MainView>()
        data.forEach {
            mainView.addLabel(Label(it.info))
        }
    }
}

class MainView: View() {
    private val myVbox = VBox()
    init {
        primaryStage.width = Screen.getPrimary().bounds.width / 2
        primaryStage.height = Screen.getPrimary().bounds.height - 210.0
        primaryStage.x = 50.0
        primaryStage.y = 50.0
        try {
            primaryStage.scene.stylesheets.add("styles.css")
        } catch (e: Exception) {
            e.printStackTrace()
        }
        primaryStage.show()
        reloadStylesheetsOnFocus()
        importStylesheet(AppStyle::class)
    }
    override val root = tabpane {
        tab("Tab 1") {
            vbox {
                this.add(myVbox)
            }
        }
        tab("Tab 2") {
            vbox {
                label("This is the content of Tab 2")
            }
        }
    }

    fun addLabel(labels: Label) {
        // myVbox.children.clear()
        myVbox.children.add(labels)
    }
}
```
