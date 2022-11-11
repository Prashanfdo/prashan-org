---
title: ASP.NET Core - Identity Scaffolding
slug: asp-net-core-identity-scaffolding
date: 2019-04-08
image: /assets/images/blog/4.jpg
tags: dotnet,aspcore
---

This post is going to cover this process use the Identity Scaffolding feature available in Visual Studio.

## Sample

For this example, I’m starting with a new web app created using the following command.

dotnet new webapp

If you have any of the .NET Core 3 previews installed I recommend adding a **global.json** file in the directory where the application is to be created before running the application creation. I had some issues with the scaffolding in the current preview. The following is the contents of my **global.json** for an example.

{ "sdk": { "version": "2.2.104" } }

## Scaffolding

In Visual Studio right-click on the project and select **Add > New Scaffolded Item**.

![](/assets/images/blog/4.1.png)

On the **Add Scaffold** dialog in the left list select **Identity** in the middle area we want the **Identity** item and then click the **Add** button.
![](/assets/images/blog/4.2.png)

Next, on the **Add Identity** dialog, you get a chance to pick which parts of the provided identity you want to override. I’m going to take the default for all the values. The one exception is the **Data context class** which I’m using the plus button to the right of the field to add a new one since this project doesn’t currently have any data access in it. When done click the **Add** button.

![](/assets/images/blog/4.3.png)

After a minute or so identity generation will be complete and a text file will so with some follow up steps. Because of the project type, we started with the only one we need to do anything with is the entity framework migrations. The following are the instructions from the file that will get your database to create/updated with the new data needed to support ASP.NET Core’s Identity.

> _The generated database code requires Entity Framework Core Migrations. Run the following commands:_
>
> _1. dotnet ef migrations add CreateIdentitySchema  
> 2. dotnet ef database update_
>
> \_Or from the Visual Studio Package Manager Console:
>
> 1. Add-Migration CreateIdentitySchema
> 2. Update-Database\_

Finally, in the **Pages/Shared** directory open the **\_Layout.cshtml** file and add the following to where you want to show the Register and Login links. I added this right after the existing navigation links.

```
<partial name="_LoginPartial"/>
```
