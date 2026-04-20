const swaggerSpec = {
  openapi: "3.0.0",
  info: {
    title: "Star Wars API",
    version: "1.0.0",
    description:
      "Documentação da API do projeto fullstack Star Wars com autenticação JWT e CRUD de filmes, personagens, planetas, espécies, veículos e espaçonaves.",
  },
  servers: [
    {
      url: "http://localhost:4000",
      description: "Servidor local",
    },
  ],
  tags: [
    { name: "Auth", description: "Autenticação e cadastro de usuários" },
    { name: "Films", description: "Operações com filmes" },
    { name: "Persons", description: "Operações com personagens" },
    { name: "Planets", description: "Operações com planetas" },
    { name: "Species", description: "Operações com espécies" },
    { name: "Vehicles", description: "Operações com veículos" },
    { name: "Starships", description: "Operações com espaçonaves" },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      ErrorResponse: {
        type: "object",
        properties: {
          error: {
            type: "string",
            example: "Erro interno do servidor",
          },
        },
      },

      MessageResponse: {
        type: "object",
        properties: {
          message: {
            type: "string",
            example: "Operação realizada com sucesso",
          },
        },
      },

      UserRegisterInput: {
        type: "object",
        required: ["name", "email", "password"],
        properties: {
          name: {
            type: "string",
            example: "Luke Skywalker",
          },
          email: {
            type: "string",
            example: "luke@email.com",
          },
          password: {
            type: "string",
            example: "123456",
          },
        },
      },

      AuthLoginInput: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: {
            type: "string",
            example: "luke@email.com",
          },
          password: {
            type: "string",
            example: "123456",
          },
        },
      },

      AuthLoginResponse: {
        type: "object",
        properties: {
          message: {
            type: "string",
            example: "Login realizado com sucesso",
          },
          token: {
            type: "string",
            example:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.exemplo.token.jwt",
          },
        },
      },

      Film: {
        type: "object",
        properties: {
          _id: {
            type: "string",
            example: "67f2b8a0d6d123456789abcd",
          },
          title: {
            type: "string",
            example: "A New Hope",
          },
          episode_id: {
            type: "number",
            example: 4,
          },
          opening_crawl: {
            type: "string",
            example: "It is a period of civil war...",
          },
          director: {
            type: "string",
            example: "George Lucas",
          },
          release_date: {
            type: "string",
            example: "1977-05-25",
          },
        },
      },

      FilmInput: {
        type: "object",
        required: ["title", "episode_id", "opening_crawl", "director", "release_date"],
        properties: {
          title: {
            type: "string",
            example: "A New Hope",
          },
          episode_id: {
            type: "number",
            example: 4,
          },
          opening_crawl: {
            type: "string",
            example: "It is a period of civil war...",
          },
          director: {
            type: "string",
            example: "George Lucas",
          },
          release_date: {
            type: "string",
            example: "1977-05-25",
          },
        },
      },

      PersonDescription: {
        type: "object",
        properties: {
          height: {
            type: "number",
            example: 172,
          },
          mass: {
            type: "number",
            example: 77,
          },
          hair_color: {
            type: "string",
            example: "blond",
          },
          skin_color: {
            type: "string",
            example: "fair",
          },
          eye_color: {
            type: "string",
            example: "blue",
          },
          gender: {
            type: "string",
            example: "male",
          },
        },
      },

      Person: {
        type: "object",
        properties: {
          _id: {
            type: "string",
            example: "67f2b8a0d6d123456789abce",
          },
          swapi_id: {
            type: "number",
            example: 1,
          },
          name: {
            type: "string",
            example: "Luke Skywalker",
          },
          birth_year: {
            type: "string",
            example: "19BBY",
          },
          homeworld: {
            type: "string",
            example: "67f2b8a0d6d123456789abcf",
          },
          species: {
            type: "string",
            example: "67f2b8a0d6d123456789abd0",
          },
          descriptions: {
            $ref: "#/components/schemas/PersonDescription",
          },
        },
      },

      PersonInput: {
        type: "object",
        required: ["name", "birth_year", "homeworld", "species", "descriptions"],
        properties: {
          name: {
            type: "string",
            example: "Luke Skywalker",
          },
          birth_year: {
            type: "string",
            example: "19BBY",
          },
          homeworld: {
            type: "string",
            example: "67f2b8a0d6d123456789abcf",
          },
          species: {
            type: "string",
            example: "67f2b8a0d6d123456789abd0",
          },
          descriptions: {
            $ref: "#/components/schemas/PersonDescription",
          },
        },
      },

      Planet: {
        type: "object",
        properties: {
          _id: {
            type: "string",
            example: "67f2b8a0d6d123456789abcf",
          },
          swapi_id: {
            type: "number",
            example: 1,
          },
          name: {
            type: "string",
            example: "Tatooine",
          },
          rotation_period: {
            type: "number",
            example: 23,
          },
          orbital_period: {
            type: "number",
            example: 304,
          },
          diameter: {
            type: "number",
            example: 10465,
          },
          climate: {
            type: "string",
            example: "arid",
          },
          gravity: {
            type: "string",
            example: "1 standard",
          },
          terrain: {
            type: "string",
            example: "desert",
          },
          surface_water: {
            type: "number",
            example: 1,
          },
          population: {
            type: "number",
            example: 200000,
          },
        },
      },

      PlanetInput: {
        type: "object",
        required: [
          "name",
          "rotation_period",
          "orbital_period",
          "diameter",
          "climate",
          "gravity",
          "terrain",
          "surface_water",
          "population",
        ],
        properties: {
          name: {
            type: "string",
            example: "Tatooine",
          },
          rotation_period: {
            type: "number",
            example: 23,
          },
          orbital_period: {
            type: "number",
            example: 304,
          },
          diameter: {
            type: "number",
            example: 10465,
          },
          climate: {
            type: "string",
            example: "arid",
          },
          gravity: {
            type: "string",
            example: "1 standard",
          },
          terrain: {
            type: "string",
            example: "desert",
          },
          surface_water: {
            type: "number",
            example: 1,
          },
          population: {
            type: "number",
            example: 200000,
          },
        },
      },

      Specie: {
        type: "object",
        properties: {
          _id: {
            type: "string",
            example: "67f2b8a0d6d123456789abd0",
          },
          swapi_id: {
            type: "number",
            example: 1,
          },
          name: {
            type: "string",
            example: "Human",
          },
          classification: {
            type: "string",
            example: "mammal",
          },
          designation: {
            type: "string",
            example: "sentient",
          },
          average_height: {
            type: "number",
            example: 180,
          },
          skin_colors: {
            type: "string",
            example: "caucasian, black, asian, hispanic",
          },
          hair_colors: {
            type: "string",
            example: "blonde, brown, black, red",
          },
          eye_colors: {
            type: "string",
            example: "brown, blue, green, hazel, grey, amber",
          },
          average_lifespan: {
            type: "number",
            example: 120,
          },
          language: {
            type: "string",
            example: "Galactic Basic",
          },
        },
      },

      SpecieInput: {
        type: "object",
        required: [
          "name",
          "classification",
          "designation",
          "average_height",
          "skin_colors",
          "hair_colors",
          "eye_colors",
          "average_lifespan",
          "language",
        ],
        properties: {
          name: {
            type: "string",
            example: "Human",
          },
          classification: {
            type: "string",
            example: "mammal",
          },
          designation: {
            type: "string",
            example: "sentient",
          },
          average_height: {
            type: "number",
            example: 180,
          },
          skin_colors: {
            type: "string",
            example: "caucasian, black, asian, hispanic",
          },
          hair_colors: {
            type: "string",
            example: "blonde, brown, black, red",
          },
          eye_colors: {
            type: "string",
            example: "brown, blue, green, hazel, grey, amber",
          },
          average_lifespan: {
            type: "number",
            example: 120,
          },
          language: {
            type: "string",
            example: "Galactic Basic",
          },
        },
      },

      Vehicle: {
        type: "object",
        properties: {
          _id: {
            type: "string",
            example: "67f2b8a0d6d123456789abd1",
          },
          name: {
            type: "string",
            example: "Sand Crawler",
          },
          model: {
            type: "string",
            example: "Digger Crawler",
          },
          manufacturer: {
            type: "string",
            example: "Corellia Mining Corporation",
          },
          cost_in_credits: {
            type: "number",
            example: 150000,
          },
          length: {
            type: "number",
            example: 36.8,
          },
          max_atmosphering_speed: {
            type: "number",
            example: 30,
          },
          crew: {
            type: "number",
            example: 46,
          },
          passengers: {
            type: "number",
            example: 30,
          },
          cargo_capacity: {
            type: "number",
            example: 50000,
          },
          consumables: {
            type: "string",
            example: "2 months",
          },
          vehicle_class: {
            type: "string",
            example: "wheeled",
          },
        },
      },

      VehicleInput: {
        type: "object",
        required: [
          "name",
          "model",
          "manufacturer",
          "cost_in_credits",
          "length",
          "max_atmosphering_speed",
          "crew",
          "passengers",
          "cargo_capacity",
          "consumables",
          "vehicle_class",
        ],
        properties: {
          name: {
            type: "string",
            example: "Sand Crawler",
          },
          model: {
            type: "string",
            example: "Digger Crawler",
          },
          manufacturer: {
            type: "string",
            example: "Corellia Mining Corporation",
          },
          cost_in_credits: {
            type: "number",
            example: 150000,
          },
          length: {
            type: "number",
            example: 36.8,
          },
          max_atmosphering_speed: {
            type: "number",
            example: 30,
          },
          crew: {
            type: "number",
            example: 46,
          },
          passengers: {
            type: "number",
            example: 30,
          },
          cargo_capacity: {
            type: "number",
            example: 50000,
          },
          consumables: {
            type: "string",
            example: "2 months",
          },
          vehicle_class: {
            type: "string",
            example: "wheeled",
          },
        },
      },

      Starship: {
        type: "object",
        properties: {
          _id: {
            type: "string",
            example: "67f2b8a0d6d123456789abd2",
          },
          name: {
            type: "string",
            example: "X-wing",
          },
          model: {
            type: "string",
            example: "T-65 X-wing",
          },
          manufacturer: {
            type: "string",
            example: "Incom Corporation",
          },
          cost_in_credits: {
            type: "number",
            example: 149999,
          },
          length: {
            type: "number",
            example: 12.5,
          },
          max_atmosphering_speed: {
            type: "number",
            example: 1050,
          },
          crew: {
            type: "string",
            example: "1",
          },
          passengers: {
            type: "number",
            example: 0,
          },
          cargo_capacity: {
            type: "number",
            example: 110,
          },
          consumables: {
            type: "string",
            example: "1 week",
          },
          hyperdrive_rating: {
            type: "number",
            example: 1,
          },
          MGLT: {
            type: "number",
            example: 100,
          },
          starship_class: {
            type: "string",
            example: "Starfighter",
          },
        },
      },

      StarshipInput: {
        type: "object",
        required: [
          "name",
          "model",
          "manufacturer",
          "cost_in_credits",
          "length",
          "max_atmosphering_speed",
          "crew",
          "passengers",
          "cargo_capacity",
          "consumables",
          "hyperdrive_rating",
          "MGLT",
          "starship_class",
        ],
        properties: {
          name: {
            type: "string",
            example: "X-wing",
          },
          model: {
            type: "string",
            example: "T-65 X-wing",
          },
          manufacturer: {
            type: "string",
            example: "Incom Corporation",
          },
          cost_in_credits: {
            type: "number",
            example: 149999,
          },
          length: {
            type: "number",
            example: 12.5,
          },
          max_atmosphering_speed: {
            type: "number",
            example: 1050,
          },
          crew: {
            type: "string",
            example: "1",
          },
          passengers: {
            type: "number",
            example: 0,
          },
          cargo_capacity: {
            type: "number",
            example: 110,
          },
          consumables: {
            type: "string",
            example: "1 week",
          },
          hyperdrive_rating: {
            type: "number",
            example: 1,
          },
          MGLT: {
            type: "number",
            example: 100,
          },
          starship_class: {
            type: "string",
            example: "Starfighter",
          },
        },
      },
    },
  },

  paths: {
    "/user": {
      post: {
        tags: ["Auth"],
        summary: "Cadastrar usuário",
        description: "Cria um novo usuário no sistema.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/UserRegisterInput",
              },
            },
          },
        },
        responses: {
          201: {
            description: "Usuário cadastrado com sucesso",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/MessageResponse",
                },
              },
            },
          },
          500: {
            description: "Erro interno do servidor",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
        },
      },
    },

    "/auth": {
      post: {
        tags: ["Auth"],
        summary: "Autenticar usuário",
        description: "Realiza login e retorna um token JWT.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/AuthLoginInput",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Login realizado com sucesso",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/AuthLoginResponse",
                },
              },
            },
          },
          401: {
            description: "Credenciais inválidas",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
          404: {
            description: "Usuário não encontrado ou email inválido",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
          500: {
            description: "Erro interno do sistema",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
        },
      },
    },

    "/films": {
      get: {
        tags: ["Films"],
        summary: "Listar filmes",
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "Lista de filmes",
          },
          401: {
            description: "Não autorizado",
          },
        },
      },
      post: {
        tags: ["Films"],
        summary: "Cadastrar filme",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/FilmInput",
              },
            },
          },
        },
        responses: {
          201: {
            description: "Filme cadastrado com sucesso",
          },
          401: {
            description: "Não autorizado",
          },
        },
      },
    },

    "/films/{id}": {
      get: {
        tags: ["Films"],
        summary: "Buscar filme por ID",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "Filme encontrado",
          },
          400: {
            description: "ID inválida",
          },
          404: {
            description: "Filme não encontrado",
          },
        },
      },
      put: {
        tags: ["Films"],
        summary: "Atualizar filme",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/FilmInput",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Filme atualizado com sucesso",
          },
          404: {
            description: "Filme não encontrado",
          },
        },
      },
      delete: {
        tags: ["Films"],
        summary: "Excluir filme",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          204: {
            description: "Filme excluído com sucesso",
          },
          400: {
            description: "ID inválida",
          },
        },
      },
    },

    "/persons": {
      get: {
        tags: ["Persons"],
        summary: "Listar personagens",
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "Lista de personagens",
          },
        },
      },
      post: {
        tags: ["Persons"],
        summary: "Cadastrar personagem",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/PersonInput",
              },
            },
          },
        },
        responses: {
          201: {
            description: "Personagem cadastrado com sucesso",
          },
        },
      },
    },

    "/persons/{id}": {
      get: {
        tags: ["Persons"],
        summary: "Buscar personagem por ID",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          200: { description: "Personagem encontrado" },
          404: { description: "Personagem não encontrado" },
        },
      },
      put: {
        tags: ["Persons"],
        summary: "Atualizar personagem",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/PersonInput",
              },
            },
          },
        },
        responses: {
          200: { description: "Personagem atualizado com sucesso" },
          404: { description: "Personagem não encontrado" },
        },
      },
      delete: {
        tags: ["Persons"],
        summary: "Excluir personagem",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          204: { description: "Personagem excluído com sucesso" },
        },
      },
    },

    "/planets": {
      get: {
        tags: ["Planets"],
        summary: "Listar planetas",
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: "Lista de planetas" },
        },
      },
      post: {
        tags: ["Planets"],
        summary: "Cadastrar planeta",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/PlanetInput",
              },
            },
          },
        },
        responses: {
          201: { description: "Planeta cadastrado com sucesso" },
        },
      },
    },

    "/planets/{id}": {
      get: {
        tags: ["Planets"],
        summary: "Buscar planeta por ID",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          200: { description: "Planeta encontrado" },
          404: { description: "Planeta não encontrado" },
        },
      },
      put: {
        tags: ["Planets"],
        summary: "Atualizar planeta",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/PlanetInput",
              },
            },
          },
        },
        responses: {
          200: { description: "Planeta atualizado com sucesso" },
          404: { description: "Planeta não encontrado" },
        },
      },
      delete: {
        tags: ["Planets"],
        summary: "Excluir planeta",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          204: { description: "Planeta excluído com sucesso" },
        },
      },
    },

    "/species": {
      get: {
        tags: ["Species"],
        summary: "Listar espécies",
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: "Lista de espécies" },
        },
      },
      post: {
        tags: ["Species"],
        summary: "Cadastrar espécie",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/SpecieInput",
              },
            },
          },
        },
        responses: {
          201: { description: "Espécie cadastrada com sucesso" },
        },
      },
    },

    "/species/{id}": {
      get: {
        tags: ["Species"],
        summary: "Buscar espécie por ID",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          200: { description: "Espécie encontrada" },
          404: { description: "Espécie não encontrada" },
        },
      },
      put: {
        tags: ["Species"],
        summary: "Atualizar espécie",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/SpecieInput",
              },
            },
          },
        },
        responses: {
          200: { description: "Espécie atualizada com sucesso" },
          404: { description: "Espécie não encontrada" },
        },
      },
      delete: {
        tags: ["Species"],
        summary: "Excluir espécie",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          204: { description: "Espécie excluída com sucesso" },
        },
      },
    },

    "/vehicles": {
      get: {
        tags: ["Vehicles"],
        summary: "Listar veículos",
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: "Lista de veículos" },
        },
      },
      post: {
        tags: ["Vehicles"],
        summary: "Cadastrar veículo",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/VehicleInput",
              },
            },
          },
        },
        responses: {
          201: { description: "Veículo cadastrado com sucesso" },
        },
      },
    },

    "/vehicles/{id}": {
      get: {
        tags: ["Vehicles"],
        summary: "Buscar veículo por ID",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          200: { description: "Veículo encontrado" },
          404: { description: "Veículo não encontrado" },
        },
      },
      put: {
        tags: ["Vehicles"],
        summary: "Atualizar veículo",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/VehicleInput",
              },
            },
          },
        },
        responses: {
          200: { description: "Veículo atualizado com sucesso" },
          404: { description: "Veículo não encontrado" },
        },
      },
      delete: {
        tags: ["Vehicles"],
        summary: "Excluir veículo",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          204: { description: "Veículo excluído com sucesso" },
        },
      },
    },

    "/starships": {
      get: {
        tags: ["Starships"],
        summary: "Listar espaçonaves",
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: "Lista de espaçonaves" },
        },
      },
      post: {
        tags: ["Starships"],
        summary: "Cadastrar espaçonave",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/StarshipInput",
              },
            },
          },
        },
        responses: {
          201: { description: "Espaçonave cadastrada com sucesso" },
        },
      },
    },

    "/starships/{id}": {
      get: {
        tags: ["Starships"],
        summary: "Buscar espaçonave por ID",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          200: { description: "Espaçonave encontrada" },
          404: { description: "Espaçonave não encontrada" },
        },
      },
      put: {
        tags: ["Starships"],
        summary: "Atualizar espaçonave",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/StarshipInput",
              },
            },
          },
        },
        responses: {
          200: { description: "Espaçonave atualizada com sucesso" },
          404: { description: "Espaçonave não encontrada" },
        },
      },
      delete: {
        tags: ["Starships"],
        summary: "Excluir espaçonave",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          204: { description: "Espaçonave excluída com sucesso" },
        },
      },
    },
  },
};

export default swaggerSpec;