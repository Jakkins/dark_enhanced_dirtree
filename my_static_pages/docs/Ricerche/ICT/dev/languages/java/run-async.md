# Run async functions

## Simple

```java
private final ExecutorService yourThreadPool = Executors.newFixedThreadPool(1);
CompletableFuture.runAsync(() -> yourFunction(args), yourThreadPool);
```
