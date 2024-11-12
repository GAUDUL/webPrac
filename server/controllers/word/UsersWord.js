const WordModel = require('../../models/Word');

const addWord = async (req,res)=>{
    const {spelling, meaning} = req.body;
    try {
        const check = await WordModel.findOne({ userId: req.session.user.id, spelling: spelling });

        if (check) {
            await WordModel.updateOne({ userId: req.session.user.id, spelling: spelling }, { meaning: meaning });
            return res.status(200).json({success: true});
        } else {
            const newWord = new WordModel({
                userId: req.session.user.id,
                spelling: spelling,
                meaning: meaning
            });
            await newWord.save();
            return res.status(201).json({success: true});
        }
    } catch (error) {
        // 에러 발생 시 처리
        console.error(error);
        return res.status(500).json({success: false});
    }
}

const lookUpWord = async (req,res)=>{
    try{
        const words = await WordModel.find({userId:req.session.user.id});
        if(words){
            return res.status(200).json({success:true, words});
        }
        else{
            return res.status(404).json({success: false});
        }
    } catch(err){
        console.log('사용자 단어 조회 오류: ',err);
        return res.status(500),json({success:false});
    }
}

module.exports= {addWord, lookUpWord}