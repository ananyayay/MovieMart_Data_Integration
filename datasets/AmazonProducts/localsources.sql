use iia_project;
Drop table if exists AmazonProducts;

CREATE TABLE AmazonProducts (
    UniqId VARCHAR(255) PRIMARY KEY ,
    ProductName VARCHAR(255),
    BrandName VARCHAR(255),
    Asin VARCHAR(255),
    Category VARCHAR(255),
    UpcEanCode VARCHAR(255),
    ListPrice VARCHAR(255),
    SellingPrice VARCHAR(2550),
    Quantity VARCHAR(255),
    ModelNumber VARCHAR(255),
    AboutProduct TEXT,
    ProductSpecification TEXT,
    TechnicalDetails TEXT,
    ShippingWeight VARCHAR(255),
    ProductDimensions VARCHAR(255),
    Image VARCHAR(2550),
    Variants VARCHAR(2550),
    Sku VARCHAR(255),
    ProductUrl VARCHAR(255),
    Stock VARCHAR(255),
    ProductDetails TEXT,
    Dimensions VARCHAR(255),
    Color VARCHAR(255),
    Ingredients TEXT,
    DirectionToUse TEXT,
    IsAmazonSeller Varchar(255),
    SizeQuantityVariant VARCHAR(255),
    ProductDescription TEXT
);
