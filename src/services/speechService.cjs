const axios = require('axios');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');
const crypto = require('crypto');

// 豆包极速版 API 配置
const APPID = "9347708265";
const ACCESS_TOKEN = "a97dkwPUki1rf9QoE1HUuYmHIfg0I7Ie";
const RESOURCE_ID = "volc.bigasr.auc_turbo";
const RECOGNIZE_URL = "https://openspeech.bytedance.com/api/v3/auc/bigmodel/recognize/flash";

// 生成 UUID v4
function uuidv4() {
    return crypto.randomUUID();
}

/**
 * 使用 ffmpeg 转换为 MP3
 */
async function convertToMP3(audioBuffer) {
    return new Promise((resolve, reject) => {
        const tempDir = os.tmpdir();
        const timestamp = Date.now();
        const inputFile = path.join(tempDir, `input_${timestamp}.webm`);
        const outputFile = path.join(tempDir, `output_${timestamp}.mp3`);

        try {
            fs.writeFileSync(inputFile, audioBuffer);
            console.log('📁 临时文件:', inputFile, audioBuffer.length, '字节');

            const cmd = `ffmpeg -y -i "${inputFile}" -ar 16000 -ac 1 -b:a 128k "${outputFile}"`;
            console.log('🔄 转换为 MP3...');

            exec(cmd, (error, stdout, stderr) => {
                try { fs.unlinkSync(inputFile); } catch (e) {}

                if (error) {
                    console.error('❌ ffmpeg 失败:', stderr);
                    try { fs.unlinkSync(outputFile); } catch (e) {}
                    return reject(new Error('音频转换失败'));
                }

                try {
                    const mp3Buffer = fs.readFileSync(outputFile);
                    console.log('✅ MP3 转换成功:', mp3Buffer.length, '字节');
                    fs.unlinkSync(outputFile);
                    resolve(mp3Buffer);
                } catch (readError) {
                    console.error('❌ 读取失败:', readError);
                    try { fs.unlinkSync(outputFile); } catch (e) {}
                    reject(readError);
                }
            });
        } catch (error) {
            console.error('❌ 文件操作失败:', error);
            try { fs.unlinkSync(inputFile); } catch (e) {}
            try { fs.unlinkSync(outputFile); } catch (e) {}
            reject(error);
        }
    });
}

/**
 * 豆包极速版语音识别（同步）
 */
async function recognizeFlash(audioBuffer) {
    try {
        console.log('🎤 开始极速识别...');

        // 将音频转换为 base64
        const base64Audio = audioBuffer.toString('base64');
        console.log('📦 Base64 数据长度:', base64Audio.length);

        // 构建请求
        const requestId = uuidv4();

        const headers = {
            'Content-Type': 'application/json',
            'X-Api-App-Key': APPID,
            'X-Api-Access-Key': ACCESS_TOKEN,
            'X-Api-Resource-Id': RESOURCE_ID,
            'X-Api-Request-Id': requestId,
            'X-Api-Sequence': '-1'
        };

        const data = {
            user: {
                uid: APPID
            },
            audio: {
                data: base64Audio  // 直接传 base64 数据
            },
            request: {
                model_name: 'bigmodel',
                enable_itn: true,      // 数字转换
                enable_punc: true,     // 标点符号
                enable_ddc: false,     // 数字转换
                enable_speaker_info: false
            }
        };

        console.log('🚀 调用极速识别 API...');
        console.log('   Request ID:', requestId);

        const response = await axios.post(RECOGNIZE_URL, data, {
            headers,
            timeout: 30000  // 30秒超时
        });

        // 检查响应头
        const statusCode = response.headers['x-api-status-code'];
        const message = response.headers['x-api-message'];
        const logid = response.headers['x-tt-logid'];

        console.log('📥 响应状态码:', statusCode);
        console.log('   消息:', message);
        console.log('   LogID:', logid);

        if (statusCode === '20000000') {
            // 成功
            console.log('✅ 识别成功!');
            console.log('   响应数据:', JSON.stringify(response.data, null, 2));

            // 提取文字
            const text = extractText(response.data);

            if (text) {
                console.log('📝 识别文字:', text);
                return text;
            } else {
                throw new Error('未能提取识别文字');
            }
        } else {
            // 失败
            throw new Error(`识别失败: code=${statusCode}, message=${message}`);
        }

    } catch (error) {
        console.error('❌ 识别异常:', error.message);
        if (error.response) {
            console.error('   状态码:', error.response.status);
            console.error('   响应头:', error.response.headers);
            console.error('   响应数据:', error.response.data);
        }
        throw error;
    }
}

/**
 * 提取识别文字
 */
function extractText(resultData) {
    try {
        // 极速版返回格式可能是：
        // {
        //   "result": {
        //     "text": "识别的文字"
        //   }
        // }
        // 或
        // {
        //   "result": "识别的文字"
        // }

        if (resultData.result) {
            if (typeof resultData.result === 'string') {
                return resultData.result;
            }
            if (resultData.result.text) {
                return resultData.result.text;
            }
        }

        // 尝试从 data 中提取
        if (resultData.data && resultData.data.result) {
            if (typeof resultData.data.result === 'string') {
                return resultData.data.result;
            }
            if (resultData.data.result.text) {
                return resultData.data.result.text;
            }
        }

        // 尝试从 utterances 中提取
        if (resultData.utterances && Array.isArray(resultData.utterances)) {
            const texts = resultData.utterances.map(u => u.text || '').filter(Boolean);
            if (texts.length > 0) {
                return texts.join('');
            }
        }

        // 尝试直接使用 text 字段
        if (resultData.text) {
            return resultData.text;
        }

        console.log('⚠️ 无法从结果中提取文字');
        console.log('   原始数据:', JSON.stringify(resultData));
        return null;

    } catch (error) {
        console.error('❌ 提取文字失败:', error);
        return null;
    }
}

/**
 * 语音识别主函数
 */
async function speechToText(audioBuffer) {
    try {
        console.log('🎤 音频大小:', audioBuffer.length, '字节');

        // 转换为 MP3
        const mp3Buffer = await convertToMP3(audioBuffer);

        // 调用极速识别
        const text = await recognizeFlash(mp3Buffer);

        return text;

    } catch (error) {
        console.error('❌ 语音识别失败:', error.message);
        throw error;
    }
}

/**
 * 将 base64 编码的音频转换为 Buffer
 */
function base64ToBuffer(base64Audio) {
    const base64Data = base64Audio.replace(/^data:audio\/\w+;base64,/, '');
    return Buffer.from(base64Data, 'base64');
}

/**
 * 转换为 PCM（兼容接口）
 */
async function convertToPCM(audioBuffer) {
    return audioBuffer;
}

module.exports = {
    speechToText,
    base64ToBuffer,
    convertToPCM
};
