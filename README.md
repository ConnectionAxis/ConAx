# ConAx
ConAx is a communicative platform to stack and share multi-modal research data. It’s a service for transformation and structural reconciliation of open research frameworks to create R&D and R&I projects. 


### GitHub Pages

[GitHub Pages](https://pages.github.com/) is designed to host your personal, organization, or project pages from a GitHub repository.

* ConnectionAxis info landing page - [connectionaxis.github.io/conax](https://connectionaxis.github.io/conax/)
* ConnectionAxis MVP - [connectionaxis.github.io/mvp](https://connectionaxis.github.io/mvp/)  

#### GitHub Pages config and deploy

Place all the folder `dist/` content to `docs/` - it will be available via address [connectionaxis.github.io/conax](https://connectionaxis.github.io/conax/)

```
$ cp -r dist/* docs/
$ git add --all && git commit -m 'deploy web update (#)' && git push
```