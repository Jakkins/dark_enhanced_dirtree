# Start app at boot up

Per avviare del codice dopo aver acceso il cellulare, per esempio se si vuole far partire un server, o un servizio (microservice), ci sono delle cose da fare.

Quello che bisogna fare e' creare un'applicazione che riceva l'intent chiamato `BOOT_COMPLETED` (android.intent.action.BOOT_COMPLETED).

To make sure you will receive the BOOT_COMPLETED make sure you do the following:

1. Add your receiver to manifest (don't forget the flags):

    <receiver android:name="com.yourpacakge.BootReceiver" android:exported="true" android:enabled="true">
        <intent-filter>
            <category android:name="android.intent.category.DEFAULT"/>
            <action android:name="android.intent.action.BOOT_COMPLETED"/>
        </intent-filter>
    </receiver>

2. Add permission:

    <uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED"/>

3. After installing your app, it needs to be lunch at least once, manually by the user, in order to receive Boot complete event

> third point is a must, open the app manually!

## il codice

manifest dell'app

```xml
<manifest>
    <uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED" />
    <application>
        <!-- ... -->
        <receiver
            android:name="com.example.automaticatbootup.AutomaticMain"
            android:enabled="true"
            android:exported="true">
            <intent-filter>
                <category android:name="android.intent.category.DEFAULT"/>
                <action android:name="android.intent.action.BOOT_COMPLETED"/>
            </intent-filter>
        </receiver>
    </application>
</manifest>
```

AutomaticMain (com.example.automaticatbootup.AutomaticMain)

> Intent.ACTION_BOOT_COMPLETED === android.intent.action.BOOT_COMPLETED

### come lanciare l'app (MainActivity)

```java
class AutomaticMain : BroadcastReceiver() {
    override fun onReceive(context: Context?, intent: Intent?) {
        val action = intent?.action
       if (action == Intent.ACTION_BOOT_COMPLETED) {
            val i = Intent(context, MainActivity::class.java)
            i.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TASK or Intent.FLAG_ACTIVITY_CLEAR_TOP or Intent.FLAG_ACTIVITY_NEW_TASK)
            context?.startActivity(i)
        }
    }
}
```

### come lanciare un Foreground service

```java
/**
 * will use:
 *     - context.startForegroundService(intent)
 *     - context.startService(intent)
 */
class AutomaticMain : BroadcastReceiver() {
    private val TAG = AutomaticMain::class.java.simpleName
    override fun onReceive(context: Context?, intent: Intent?) {
        val action = intent?.action
        if (action == Intent.ACTION_BOOT_COMPLETED) {
            val i = Intent(context, MainService::class.java)
            ForegroundHelper.lauchForegroundService(context!!, i)
        }
    }
}
```

## come testare

with adb

```bash
adb root
# adb shell am broadcast -a {action} {your app}
adb shell am broadcast -a android.intent.action.BOOT_COMPLETED com.example.automaticatbootup
```

or just switch off/on the smartphone

## cose interessanti

- [lista di un po' di intent](https://gist.github.com/pwittchen/1aba5f9a1f71d7770f76)
- `<action android:name="android.intent.action.QUICKBOOT_POWERON" />`
