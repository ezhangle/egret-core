//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

/**
 * @internal
 */
namespace egret.sys {

    /**
     * @internal
     */
    export interface ScreenAdapter {

        calculateStageSize(scaleMode:string, screenWidth:number, screenHeight:number,
                           contentWidth:number, contentHeight:number):StageDisplaySize;
    }

    /**
     * @internal
     */
    export interface StageDisplaySize {

        stageWidth:number;

        stageHeight:number;

        displayWidth:number;

        displayHeight:number;
    }

    /**
     * @internal
     */
    export class DefaultScreenAdapter implements ScreenAdapter {

        /**
         * @private
         */
        public calculateStageSize(scaleMode:string, screenWidth:number, screenHeight:number,
                                  contentWidth:number, contentHeight:number):StageDisplaySize {
            let displayWidth = screenWidth;
            let displayHeight = screenHeight;
            let stageWidth = contentWidth;
            let stageHeight = contentHeight;
            let scaleX = (screenWidth / stageWidth) || 0;
            let scaleY = (screenHeight / stageHeight) || 0;
            switch (scaleMode) {
                case egret.StageScaleMode.EXACT_FIT:
                    break;
                case egret.StageScaleMode.NO_BORDER:
                    if (scaleX > scaleY) {
                        displayHeight = Math.round(stageHeight * scaleX);
                    }
                    else {
                        displayWidth = Math.round(stageWidth * scaleY);
                    }
                    break;
                case egret.StageScaleMode.SHOW_ALL:
                    if (scaleX > scaleY) {
                        displayWidth = Math.round(stageWidth * scaleY);
                    }
                    else {
                        displayHeight = Math.round(stageHeight * scaleX);
                    }
                    break;
                default :
                    stageWidth = screenWidth;
                    stageHeight = screenHeight;
                    break;
            }
            return {
                stageWidth: stageWidth,
                stageHeight: stageHeight,
                displayWidth: displayWidth,
                displayHeight: displayHeight
            };
        }
    }

    /**
     * @internal
     */
    export let screenAdapter:ScreenAdapter = new DefaultScreenAdapter();
}