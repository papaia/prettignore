<h1 align="center">Prettignore</h2>
<h2 align="center">Prettier but for ignore files!</h2>

<p align="center">
  <em>
    Format any .*ignore file with ease!
  </em>
</p>

## CLI

Just run `prettignore` with a valid configuration, and watch your files get pretty!

## Configuration

Make a `.prettygnorerc.json` file in the root of your project.

```jsonc
{
  "eol": "crlf", // "lf" or "crlf" (default)
  "include": [], // array of globs (empty by default)
  "exclude": [] //  array of globs (empty by default)
}
```

## API

### formatLine(content: string)

```ts
formatLine(content);
```

### formatFile(content: string, config: PrettignoreConfig)

```ts
formatFile(content, { eol: 'crlf' });
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
