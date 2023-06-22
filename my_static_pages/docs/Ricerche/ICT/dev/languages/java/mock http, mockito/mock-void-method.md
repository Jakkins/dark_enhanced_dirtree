# Mock void method of a class

```java
@SpringBootTest
@ActiveProfiles("test")
class MyTestClass {

  @SpyBean
  private YourService service;

  @Test
  void shouldMockVoidMethod() {
    var service = Mockito.mock(YourService.class);
		Mockito.doAnswer((Answer<Void>) invocationOnMock -> {
			invocationOnMock.callRealMethod();
			return null;
		}).when(service).methodToMock(Mockito.anyList());
  }
}
```
