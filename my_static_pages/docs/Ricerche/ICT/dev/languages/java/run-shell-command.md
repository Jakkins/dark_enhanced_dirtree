# How to run shell commands

```java
val process = Runtime.getRuntime().exec(arrayOf("bash", "-c", "whoami"))
// val process = Runtime.getRuntime().exec(arrayOf("sh", "-c", "/data/data/com.termux/files/usr/bin/python --version"))
val stdoutString: String = convertInputStreamToString(process.inputStream)
val stderrString: String = convertInputStreamToString(process.errorStream)
Log.d(TAG, stdoutString)
Log.d(TAG, stderrString)

private fun convertInputStreamToString(stream: InputStream?): String {
    return stream?.bufferedReader()?.use { it.readText() } ?: ""
}
```
