/*
   Copyright 2018 Digimarc, Inc

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.

   SPDX-License-Identifier: Apache-2.0
*/

import { Vulnerability } from "./vulnerability";
import { ScanComponent } from "./scanComponent";

export class ScanResult {
    constructor(obj?: any) {
        Object.assign(this, obj);
        this.vulnerableComponents = this.vulnerableComponents.map(c => new ScanComponent(c)).sort((a, b) => b.maxSeverity - a.maxSeverity);
    }

    public digest: String;
    public status: String;
    public message: String;
    public totalComponents: number;
    public vulnerableComponents: ScanComponent[];

    public get hasVulnerabilities(): Boolean {
        return this.vulnerableComponents != null && this.vulnerableComponents.length > 0;
    }
}
