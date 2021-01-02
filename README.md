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

### formatLine(content: string)

```ts
formatLine(content);
```

### formatFile(content: string, config: PrettignoreConfig)

```ts
formatFile(content, { endOfLine: 'lf' });
```

## Examples

### Adds spaces after comments

<!-- prettier-ignore -->
```
#just a nice comment!
```

Becomes:

<!-- prettier-ignore -->
```
# just a nice comment!
```

### Removes trailing and leading spaces and lines

<!-- prettier-ignore -->
```

        dist
              build


```

Becomes:

<!-- prettier-ignore -->
```
dist
build
```

### Removes line gaps larger than one line

<!-- prettier-ignore -->
```
dist



build
```

Becomes:

<!-- prettier-ignore -->
```
dist

build
```
