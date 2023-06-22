# Mock with Mockito

## Mock a public methods

```java
MyClass myMockedClass = Mockito.mock(MyClass.class);
Mockito.when(myMockedClass.myFunction()).thenReturn("Mocked value");
```

## Mock a private methods

To mock a private method you have to use another library:

- PowerMockito

## Mock static methods

To mock a static method you have to use another library:

- Mockito Inline
