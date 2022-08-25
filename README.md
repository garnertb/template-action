# handlebars-action
# Usage

Any variables passed will be used as context for the template.

```yaml
uses: garnertb/handlebars-action@v1
with:
  template: Whats up {{ name }}?
  name: Mona

# Returns
# >> Whats up Mona?
```