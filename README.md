# Precious Metals API

A RESTful API built with Next.js (App Router), MongoDB Atlas, and Mongoose that provides weekly updated gold and silver prices for selected major economies.

## Overview

This API exposes gold and silver prices per troy ounce for selected major countries.
It supports country-level filtering, multiple country queries, HTTP caching, input validation, and database seeding.

The project is designed as a backend-focused service and demonstrates clean API structure, proper database modeling, and performance optimizations.

## Features

RESTful API architecture

MongoDB Atlas integration

Mongoose schemas with proper ObjectId references

Country-based query filtering

Multiple country query support

API throttling via proxy

Input validation using Zod

CORS configuration

HTTP caching (Cache-Control)

Database seeding scripts

TypeScript support

## Supported Metals

Gold

Silver

All prices are stored per troy ounce (ozt).

## Supported Countries

US, CN, IN, DE, FR, GB, CH, AE, HK, JP, AU, KR

API Base Route
/api/v1/precious-metals

## Endpoints

**Get Metadata**

GET /api/v1/precious-metals

Returns available metals along with their supported countries.

**Get All Prices for a Metal**

GET /api/v1/precious-metals/gold

Returns prices for all supported countries for the specified metal.

**Get Price for Specific Country Country**

GET /api/v1/precious-metals/gold?country=US

**Multiple Countries (repeating query parameter)**

GET /api/v1/precious-metals/gold?country=US&country=IN

## Security and Optimization

- Zod-based query validation

- CORS headers enabled

- Proxy-based API throttling

- HTTP caching

- Lean MongoDB queries for improved performance

- Proper ObjectId references for relational integrity

## Tech Stack

- Next.js (App Router)

- TypeScript

- MongoDB Atlas

- Mongoose

- Zod

- Node.js

## License

MIT
