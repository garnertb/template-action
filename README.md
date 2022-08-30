# template-action

Action that enables arbitrary template rendering in GitHub actions

## Usage

Any variables passed will be used as context for the template.

### Simple example

```yaml
uses: garnertb/template-action@v1
with:
  template: Whats up {{ name }}?
  name: Mona

# Returns
# >> Whats up Mona?
```

### More complex example

This example creates a summary issue with all issues created in the last week.

```yaml
# Query recently updated issues
- uses: octokit/request-action@v2.x
  id: open-issues
  with:
    route: /repos/:owner/:repo/issues?sort=updated&per_page=100&state=all
    owner: garnertb
    repo: handlebars-action
  env:
    GITHUB_TOKEN: ${{ secrets.token }} 

# Use template-action to generate the issue body
- uses: garnertb/template-action@v1
  id: issue-body
  with:
    issues: ${{ steps.open-issues.outputs.data }}
    template: |
      ## Open issues
      {{#each issues }}
      {{#withinAWeek this.updated_at}}
      - [ ] #{{this.number}}
      {{/withinAWeek}}
      {{/each }}

# Create summary issue from template payload
- uses: imjohnbo/issue-bot@v3
  with:
    body: ${{ steps.issue-body.outputs.payload }}
    title: Issues from this week
```
