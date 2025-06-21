(async () => {
    const Admin = require('../app/Models/Admin');
    const generateHash = require('../app/Helpers/Helpers').generateHash;
    const HU = require('../app/Models/HU');
    const BauCua = require('../app/Models/BauCua/BauCua_temp');
    const ZeusPercent = require('../app/Models/Zeus/Zeus_percent');

    // Khởi tạo Admin
    const adminCount = await Admin.estimatedDocumentCount();
    if (adminCount === 0) {
        await Admin.create({
            username: 'admin',
            password: generateHash('123456'),
            rights: 9,
            regDate: new Date()
        });
    }

    // Khởi tạo Bầu Cua
    const bauCuaData = await BauCua.findOne();
    if (!bauCuaData) {
        await BauCua.create({});
    }

    // Tạo hàm tiện lợi
    async function createHU(game, type, bet, min) {
        const data = await HU.findOne({ game, type, red: true });
        if (!data) {
            await HU.create({ game, type, red: true, bet, min });
        }
    }

    // Mini Poker
    await createHU('minipoker', 100, 500000, 500000);
    await createHU('minipoker', 1000, 5000000, 5000000);
    await createHU('minipoker', 10000, 50000000, 50000000);

    // Big Babol
    await createHU('bigbabol', 100, 500000, 500000);
    await createHU('bigbabol', 1000, 5000000, 5000000);
    await createHU('bigbabol', 10000, 50000000, 50000000);

    // Vương Quốc Red
    await createHU('vuongquocred', 100, 500000, 500000);
    await createHU('vuongquocred', 1000, 5000000, 5000000);
    await createHU('vuongquocred', 10000, 50000000, 50000000);

    // Mini 3 Cây
    await createHU('mini3cay', 100, 250000, 250000);
    await createHU('mini3cay', 1000, 2500000, 2500000);
    await createHU('mini3cay', 10000, 25000000, 25000000);

    // Cao Thấp
    await createHU('caothap', 1000, 7000, 7000);
    await createHU('caothap', 10000, 70000, 70000);
    await createHU('caothap', 50000, 350000, 350000);
    await createHU('caothap', 100000, 700000, 700000);
    await createHU('caothap', 500000, 3500000, 3500000);

    // AngryBirds
    await createHU('arb', 100, 500000, 500000);
    await createHU('arb', 1000, 5000000, 5000000);
    await createHU('arb', 10000, 50000000, 50000000);

    // Candy
    await createHU('candy', 100, 500000, 500000);
    await createHU('candy', 1000, 5000000, 5000000);
    await createHU('candy', 10000, 50000000, 50000000);

    // Long Lân
    await createHU('long', 100, 500000, 500000);
    await createHU('long', 1000, 5000000, 5000000);
    await createHU('long', 10000, 50000000, 50000000);

    // Zeus
    await createHU('Zeus', 100, 500000, 500000);
    await createHU('Zeus', 1000, 5000000, 5000000);
    await createHU('Zeus', 10000, 50000000, 50000000);

    // MegaJackpot
    await createHU('megaj', 100, 5000000, 5000000);
    await createHU('megaj', 1000, 50000000, 50000000);
    await createHU('megaj', 10000, 200000000, 200000000);

    console.log("✅ Dữ liệu khởi tạo thành công");
})();
