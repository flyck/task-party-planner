# Party Task Planner

## CI/CD

Vercel provides CI/CD jobs out of the box. Played around with overriding the jobs
(https://vercel.com/guides/how-can-i-use-github-actions-with-vercel) before finding out these jobs
can be customized in the vercel project settings (not a file in this repo).

## SSR Bullshit

Because I am using localstorage to store the username, nextjs goes crazy:
https://nextjs.org/docs/messages/react-hydration-error
