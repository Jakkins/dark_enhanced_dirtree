# Setup basic gradle project

## Sources

- <https://github.com/openjfx/javafx-gradle-plugin>
- <https://github.com/edvin/tornadofx>
- <https://docs.tornadofx.io/>

## build.gradle.kts

```kts
plugins {
    kotlin("jvm") version "1.8.0"
    application
    id("org.openjfx.javafxplugin") version "0.0.13"
}

group = "yourgroup"
version = "1.0-SNAPSHOT"

repositories {
    mavenCentral()
}

dependencies {
    testImplementation(kotlin("test"))
    implementation("no.tornado:tornadofx:1.7.20")
}

tasks.test {
    useJUnitPlatform()
}

kotlin {
    jvmToolchain(8)
}

application {
    mainClass.set("MainKt")
}

javafx {
    version = "12"
    modules("javafx.controls", "javafx.fxml")
}
```

## Main.kt

```kotlin
import tornadofx.launch
import view.AppView

fun main(args: Array<String>) {
    launch<AppView>(args)
}
```

## AppView

```kotlin
import tornadofx.*

class AppView: App(MainView::class) {}

class MainView: View() {
    override val root = vbox {
        button("Press me")
        label("Waiting")
    }
}
```
