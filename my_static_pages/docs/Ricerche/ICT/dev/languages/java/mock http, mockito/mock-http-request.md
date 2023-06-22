# Mock HTTP request

## MockMvcRequestBuilders

- post, get, multipart

```java
mockMvc.perform(
			post("/your/api/path?id=:id")
			.contentType(MediaType.APPLICATION_JSON)
			.content("{\"id\":-1,\"name\":\"name\",\"value\":95}")
		)
		.andDo(print())
		.andExpect(status().is2xxSuccessful())
		.andReturn()
		.getResponse();

performRequest(
	post("/your/api/path?id=3")
		.contentType(MediaType.APPLICATION_JSON)
		.content("{\"id\":-1,\"name\":\"name\",\"value\":95}")
);
```

### Multipart example

```java
MockMultipartFile mockedFile = new MockMultipartFile(
	"fileToImport", // Name of the file input field in the multipart/form-data request
	file.getName(), // Original filename of the CSV file
	"application/json, text/plain, */*", // Content type of the CSV file
	Files.readAllBytes(file.toPath()) // Content of the CSV file as a byte array
);

performRequest(
	multipart("/your/api/path").file(mockedFile)
);
```
