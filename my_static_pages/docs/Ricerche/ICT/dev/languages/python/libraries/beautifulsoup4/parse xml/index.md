# Parse XML with Beautiful Soup 4

Example of `pom.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <artifactId>parent</artifactId>
        <groupId>somename</groupId>
        <version>1.0.0</version>
    </parent>

    <artifactId>modulename</artifactId>
    <version>1.0.0</version>

    <properties>
        <maven.compiler.source>17</maven.compiler.source>
        <maven.compiler.target>17</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>

    <dependencies>
        <dependency>
            <groupId>group1</groupId>
            <artifactId>common</artifactId>
        </dependency>
        <dependency>
            <groupId>group2</groupId>
            <artifactId>auto-arima</artifactId>
        </dependency>
        <dependency>
            <groupId>com.google.guava</groupId>
            <artifactId>guava</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>com.fasterxml.jackson.core</groupId>
            <artifactId>jackson-databind</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-mongodb</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.kafka</groupId>
            <artifactId>spring-kafka</artifactId>
        </dependency>

        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>org.springframework.kafka</groupId>
            <artifactId>spring-kafka-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <build>
        <finalName>${project.name}</finalName>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <configuration>
                    <excludes>
                        <exclude>
                            <groupId>org.projectlombok</groupId>
                            <artifactId>lombok</artifactId>
                        </exclude>
                    </excludes>
                </configuration>
            </plugin>
        </plugins>
    </build>

    <repositories>
        <repository>
            <id>nexus</id>
            <name>project-public</name>
            <url>https://host.it/blabla</url>
        </repository>
    </repositories>
</project>
```

Example of how to parse:

```python
from bs4 import BeautifulSoup
import os
import sys

sys.path.append("c:\\python311\\lib\\site-packages")
sys.path.append(
    "C:\\Users\\{username}\\AppData\\Roaming\\Python\\Python311\\site-packages"
)

ABSPATH = os.path.realpath(os.path.dirname(__file__))
os.chdir(ABSPATH)

list_of_dir = []
for item in os.listdir(ABSPATH):
    item_path = os.path.join(ABSPATH, item)
    if os.path.isdir(item_path):
        list_of_dir.append(item_path)

#  xml.dom.minidom
#  xml.etree.ElementTree
#  beautifulsoup4  +  lxml

for dir in list_of_dir:
    filepath = os.path.join(dir, "pom.xml")
    if os.path.exists(filepath):
        # print("{}".format(filepath))
        with open(filepath, "r") as f:
            data = f.read()
        Bs_data = BeautifulSoup(data, features="xml")
        b_parent = Bs_data.find_all("parent")								
        b_dependencies = Bs_data.find_all("dependency")
        for dependency in b_dependencies:
          for tag in dependency("artifactId"):
              if(tag.text == "common" and b_parent):
                  print(filepath)
                # print(str(tag.text)) if tag is not None else ''
```
