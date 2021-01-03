<h1 align="center">Prettignore</h2>
<h2 align="center">Prettier but for ignore files!</h2>

<p align="center">
  <em>
    Format any .*ignore file with ease!
  </em>
</p>

## CLI

Run `prettignore --help` for details

## Configuration

Make a `.prettignorerc.json` file in the root of your project.

The config should have the following structure:

```ts
interface PrettignoreConfig {
  files: string[];
  endOfLine?: 'lf' | 'crlf' | 'cr' | 'auto';
}
```

## API

### formatLine(line: string): string

```ts
formatLine(line);
```

### formatFile(content: string, config: PrettignoreConfig): string

```ts
formatFile(content, { endOfLine: 'lf' });
```

## Examples

### Adds spaces after comments

<!-- prettier-ignore -->
```ignore
#just a nice comment!
```

Becomes:

<!-- prettier-ignore -->
```ignore
# just a nice comment!
```

### Removes trailing and leading spaces and lines

<!-- prettier-ignore -->
```ignore

        dist
              build


```

Becomes:

<!-- prettier-ignore -->
```ignore
dist
build
```

### Removes line gaps larger than one line

<!-- prettier-ignore -->
```ignore
dist



build
```

Becomes:

<!-- prettier-ignore -->
```ignore
dist

build
```

### E v e r y t h i n g

<!-- prettier-ignore -->
```ignore


dist      

    .ignored*



    #comment


  # another comment

  build/

  .secretfile.json



  
```

Becomes:

```ignore
dist

.ignored*

# comment

# another

build/

.secretfile.json
```
