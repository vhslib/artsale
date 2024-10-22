import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

function swallowError<T>(promise: Promise<T>) {
    return promise.catch(() => {})
}

async function run() {
    await swallowError(prisma.category.create({
        data: {
            name: 'Живопись',
            description: 'Описание живописи',
            properties: {
                createMany: {
                    data: [
                        {
                            name: 'Жанр',
                            type: 'MULTI_OPTION',
                            options: ['Натюрморт', 'Пейзаж', 'Портрет', 'Жанр', 'Анималистика', 'Театр', 'Ню', 'Военная тема', 'Восток', 'Город', 'Графика', 'Зима']
                        },
                        {
                            name: 'Техника',
                            type: 'OPTION',
                            options: ['Бумага / акварель', 'Бумага / карандаш, акварель, белила', 'Бумага / гуашь', 'Бумага / гуашь, карандаш', 'Бумага / масло', 'Бумага / пастель', 'Бумага / сангина', 'Бумага / см.техника', 'Бумага / темпера', 'Бумага / уголь', 'Бумага / уголь, белила', 'Бумага / цв. карандаши', 'Бумага на холсте / масло']
                        }
                    ]
                }
            }
        }
    }))

    await swallowError(prisma.category.create({
        data: {
            name: 'Скульптура',
            description: 'Описание скульптуры',
            properties: {
                createMany: {
                    data: [
                        {
                            name: 'Жанр',
                            type: 'MULTI_OPTION',
                            options: ['Гелиос']
                        }
                    ]
                }
            }
        }
    }))

    await swallowError(prisma.category.create({
        data: {
            name: 'Услуги',
            description: 'Описание услуг',
            properties: {
                createMany: {
                    data: [
                        {
                            name: 'Жанр',
                            type: 'MULTI_OPTION',
                            options: [
                                'Учитель рисования',
                                'Учитель музыки',
                                'Рисунок на заказ'
                            ]
                        }
                    ]
                }
            }
        }
    }))
}

run()
